from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import LearningResource, UserLearningProgress, IndustryTraining
from .serializers import (
    LearningResourceSerializer,
    UserLearningProgressSerializer,
    IndustryTrainingSerializer
)
from apps.skill_gaps.models import SkillGapAnalysis

class LearningResourceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = LearningResource.objects.prefetch_related('skills_targeted').all()
    serializer_class = LearningResourceSerializer
    permission_classes = [permissions.AllowAny]

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def recommended(self, request):
        student_profile = getattr(request.user, 'student_profile', None)
        if not student_profile:
            return Response(self.get_serializer(self.queryset[:5], many=True).data)

        latest_gap = SkillGapAnalysis.objects.filter(student=student_profile).first()
        if latest_gap and latest_gap.missing_skills:
            matched_resources = LearningResource.objects.filter(
                skills_targeted__name__in=latest_gap.missing_skills
            ).distinct()
            if matched_resources.exists():
                return Response(self.get_serializer(matched_resources, many=True).data)

        return Response(self.get_serializer(self.queryset[:6], many=True).data)

class UserLearningProgressViewSet(viewsets.ModelViewSet):
    serializer_class = UserLearningProgressSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        student_profile = getattr(self.request.user, 'student_profile', None)
        if not student_profile:
            return UserLearningProgress.objects.none()
        return UserLearningProgress.objects.filter(student=student_profile).select_related('resource')

    def perform_create(self, serializer):
        student_profile = self.request.user.student_profile
        serializer.save(student=student_profile)

from common.constants.roles import UserRole
from apps.opportunities.permissions import OpportunityPermission

class IndustryTrainingViewSet(viewsets.ModelViewSet):
    serializer_class = IndustryTrainingSerializer
    permission_classes = [permissions.IsAuthenticated, OpportunityPermission]

    def get_queryset(self):
        user = self.request.user
        if not user or not user.is_authenticated:
            return IndustryTraining.objects.select_related('industry').filter(is_active=True)
        if user.is_staff or user.role == UserRole.SUPER_ADMIN:
            return IndustryTraining.objects.select_related('industry').all()
        if hasattr(user, 'industry_profile') and user.role == UserRole.INDUSTRY:
            if self.action in ['update', 'partial_update', 'destroy']:
                return IndustryTraining.objects.select_related('industry').filter(industry=user.industry_profile)
            return (IndustryTraining.objects.select_related('industry').filter(is_active=True) |
                    IndustryTraining.objects.select_related('industry').filter(industry=user.industry_profile)).distinct()
        return IndustryTraining.objects.select_related('industry').filter(is_active=True)

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated(), OpportunityPermission()]

    def perform_create(self, serializer):
        industry_profile = getattr(self.request.user, 'industry_profile', None)
        if not industry_profile and not (self.request.user.is_staff or self.request.user.role == UserRole.SUPER_ADMIN):
            raise permissions.exceptions.PermissionDenied("Only industry recruiters or administrators can create training programs.")
        if industry_profile:
            serializer.save(industry=industry_profile)
        else:
            serializer.save()

