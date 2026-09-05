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

class IndustryTrainingViewSet(viewsets.ModelViewSet):
    queryset = IndustryTraining.objects.select_related('industry').filter(is_active=True)
    serializer_class = IndustryTrainingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return super().get_permissions()

    def perform_create(self, serializer):
        industry_profile = getattr(self.request.user, 'industry_profile', None)
        if industry_profile:
            serializer.save(industry=industry_profile)
        else:
            serializer.save()

