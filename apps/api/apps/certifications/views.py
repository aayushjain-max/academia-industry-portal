from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Certification
from .serializers import CertificationSerializer
from .permissions import CertificationPermission
from common.permissions.object_permissions import IsOwnerOrAdmin
from common.constants.roles import UserRole

class CertificationViewSet(viewsets.ModelViewSet):
    serializer_class = CertificationSerializer
    permission_classes = [CertificationPermission, IsOwnerOrAdmin]

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        if self.action == 'verify':
            return [CertificationPermission()]
        return [CertificationPermission(), IsOwnerOrAdmin()]

    def get_queryset(self):
        user = self.request.user
        if self.action in ['verify', 'retrieve'] or not user.is_authenticated:
            return Certification.objects.all()
        if hasattr(user, 'student_profile'):
            return Certification.objects.filter(student=user.student_profile)
        return Certification.objects.all()

    def perform_create(self, serializer):
        student_profile = getattr(self.request.user, 'student_profile', None)
        if not student_profile:
            raise permissions.exceptions.PermissionDenied("Only students can add certifications.")
        serializer.save(student=student_profile)

    @action(detail=True, methods=['post'])
    def verify(self, request, pk=None):
        if request.user.role not in [UserRole.ACADEMICIAN, UserRole.INSTITUTION_ADMIN, UserRole.SUPER_ADMIN] and not request.user.is_staff:
            raise permissions.exceptions.PermissionDenied("Students cannot self-verify certifications. Only academicians or administrators can verify certifications.")
        cert = self.get_object()
        cert.verification_status = 'VERIFIED'
        cert.verifier_notes = request.data.get('notes', 'Verified via issuing credential authority.')
        cert.save()
        return Response({'status': 'VERIFIED', 'message': 'Certification verified successfully.'})


