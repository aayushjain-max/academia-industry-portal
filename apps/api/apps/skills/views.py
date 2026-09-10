from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Skill, StudentSkill
from .serializers import SkillSerializer, StudentSkillSerializer
from apps.students.models import StudentProfile

class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ['name', 'description']
    filterset_fields = ['category']

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAdminUser()]
        return [permissions.IsAuthenticated()]

class StudentSkillViewSet(viewsets.ModelViewSet):
    serializer_class = StudentSkillSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Return skills belonging to the current student
        try:
            student_profile = self.request.user.student_profile
            return StudentSkill.objects.filter(student=student_profile).select_related('skill')
        except StudentProfile.DoesNotExist:
            return StudentSkill.objects.none()

    def perform_create(self, serializer):
        student_profile = self.request.user.student_profile
        serializer.save(student=student_profile)

