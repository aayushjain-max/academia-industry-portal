from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Certification
from .serializers import CertificationSerializer

class CertificationViewSet(viewsets.ModelViewSet):
    serializer_class = CertificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
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
        cert = self.get_object()
        cert.verification_status = 'VERIFIED'
        cert.verifier_notes = request.data.get('notes', 'Verified via issuing credential authority.')
        cert.save()
        return Response({'status': 'VERIFIED', 'message': 'Certification verified successfully.'})

