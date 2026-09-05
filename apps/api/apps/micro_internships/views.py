from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import MicroInternship
from .serializers import MicroInternshipSerializer

class MicroInternshipViewSet(viewsets.ModelViewSet):
    queryset = MicroInternship.objects.select_related('industry').prefetch_related('required_skills').filter(status='OPEN')
    serializer_class = MicroInternshipSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return super().get_permissions()

    def perform_create(self, serializer):
        industry_profile = getattr(self.request.user, 'industry_profile', None)
        if not industry_profile:
            raise permissions.exceptions.PermissionDenied("Only industry recruiters can post micro-internships.")
        serializer.save(industry=industry_profile)

