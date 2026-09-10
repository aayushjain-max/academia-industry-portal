from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Project
from .serializers import ProjectSerializer
from .permissions import ProjectPermission
from common.permissions.object_permissions import IsOwnerOrAdmin
from common.constants.roles import UserRole

class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    permission_classes = [ProjectPermission, IsOwnerOrAdmin]

    def get_permissions(self):
        if self.action in ['list', 'retrieve', 'live_projects']:
            return [permissions.AllowAny()]
        if self.action == 'verify':
            return [ProjectPermission()]
        return [ProjectPermission(), IsOwnerOrAdmin()]

    def get_queryset(self):
        user = self.request.user
        qs = Project.objects.all().select_related('student__user')
        if self.action in ['verify', 'retrieve', 'live_projects'] or not user.is_authenticated:
            return qs
        if hasattr(user, 'student_profile'):
            return qs.filter(student=user.student_profile)
        return qs

    def perform_create(self, serializer):
        student_profile = getattr(self.request.user, 'student_profile', None)
        if not student_profile:
            raise permissions.exceptions.PermissionDenied("Only students can create projects.")
        serializer.save(student=student_profile)

    @action(detail=True, methods=['post'])
    def verify(self, request, pk=None):
        if request.user.role not in [UserRole.ACADEMICIAN, UserRole.INSTITUTION_ADMIN, UserRole.SUPER_ADMIN] and not request.user.is_staff:
            raise permissions.exceptions.PermissionDenied("Students cannot self-verify projects. Only academicians or administrators can verify projects.")
        
        # Check if institution admin or academician is verified
        if request.user.role == UserRole.INSTITUTION_ADMIN:
            inst_prof = getattr(request.user, 'institution_profile', None)
            if inst_prof and hasattr(inst_prof, 'is_verified') and not inst_prof.is_verified:
                raise permissions.exceptions.PermissionDenied("Unverified institution administrator cannot verify projects.")

        project = self.get_object()
        project.is_verified = True
        project.save()
        return Response({'status': 'VERIFIED', 'message': 'Project successfully verified.'})

    @action(detail=False, methods=['get'])
    def live_projects(self, request):
        live_projs = self.get_queryset().filter(project_type='INDUSTRY_LIVE')
        serializer = self.get_serializer(live_projs, many=True)
        return Response(serializer.data)

