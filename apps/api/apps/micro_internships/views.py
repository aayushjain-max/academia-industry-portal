from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from common.constants.roles import UserRole
from apps.opportunities.permissions import OpportunityPermission
from .models import MicroInternship
from .serializers import MicroInternshipSerializer

class MicroInternshipViewSet(viewsets.ModelViewSet):
    serializer_class = MicroInternshipSerializer
    permission_classes = [permissions.IsAuthenticated, OpportunityPermission]

    def get_queryset(self):
        user = self.request.user
        if not user or not user.is_authenticated:
            return MicroInternship.objects.select_related('industry').prefetch_related('required_skills').filter(status='OPEN')
        if user.is_staff or user.role == UserRole.SUPER_ADMIN:
            return MicroInternship.objects.select_related('industry').prefetch_related('required_skills').all()
        if hasattr(user, 'industry_profile') and user.role == UserRole.INDUSTRY:
            if self.action in ['update', 'partial_update', 'destroy']:
                return MicroInternship.objects.select_related('industry').prefetch_related('required_skills').filter(industry=user.industry_profile)
            return (MicroInternship.objects.select_related('industry').prefetch_related('required_skills').filter(status='OPEN') | 
                    MicroInternship.objects.select_related('industry').prefetch_related('required_skills').filter(industry=user.industry_profile)).distinct()
        return MicroInternship.objects.select_related('industry').prefetch_related('required_skills').filter(status='OPEN')

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated(), OpportunityPermission()]

    def perform_create(self, serializer):
        industry_profile = getattr(self.request.user, 'industry_profile', None)
        if not industry_profile:
            raise permissions.exceptions.PermissionDenied("Only industry recruiters can post micro-internships.")
        serializer.save(industry=industry_profile)

