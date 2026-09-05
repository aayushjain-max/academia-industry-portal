from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Project
from .serializers import ProjectSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.action in ['list', 'retrieve', 'live_projects']:
            return [permissions.AllowAny()]
        return super().get_permissions()

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated and hasattr(user, 'student_profile'):
            return Project.objects.filter(student=user.student_profile)
        return Project.objects.all()

    def perform_create(self, serializer):
        student_profile = getattr(self.request.user, 'student_profile', None)
        if not student_profile:
            raise permissions.exceptions.PermissionDenied("Only students can create projects.")
        serializer.save(student=student_profile)

    @action(detail=True, methods=['post'])
    def verify(self, request, pk=None):
        project = self.get_object()
        project.is_verified = True
        project.save()
        return Response({'status': 'VERIFIED', 'message': 'Project successfully verified.'})

    @action(detail=False, methods=['get'])
    def live_projects(self, request):
        live_projs = Project.objects.filter(project_type='INDUSTRY_LIVE')
        serializer = self.get_serializer(live_projs, many=True)
        return Response(serializer.data)

