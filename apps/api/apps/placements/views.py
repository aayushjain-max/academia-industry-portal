from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import PlacementDrive, PlacementRecord
from .serializers import PlacementDriveSerializer, PlacementRecordSerializer
from .permissions import PlacementPermission, PlacementRecordPermission

class PlacementDriveViewSet(viewsets.ModelViewSet):
    queryset = PlacementDrive.objects.select_related('company').all()
    serializer_class = PlacementDriveSerializer
    permission_classes = [PlacementPermission]

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [PlacementPermission()]

    def perform_create(self, serializer):
        industry_profile = getattr(self.request.user, 'industry_profile', None)
        if not industry_profile:
            raise permissions.exceptions.PermissionDenied("Only industry recruiters can host placement drives.")
        serializer.save(company=industry_profile)

from common.constants.roles import UserRole

class PlacementRecordViewSet(viewsets.ModelViewSet):
    serializer_class = PlacementRecordSerializer
    permission_classes = [PlacementRecordPermission]

    def get_queryset(self):
        user = self.request.user
        if not user or not user.is_authenticated:
            return PlacementRecord.objects.none()
        if user.is_staff or user.role in [UserRole.SUPER_ADMIN, UserRole.INSTITUTION_ADMIN]:
            return PlacementRecord.objects.select_related('student__user', 'drive__company').all()
        if hasattr(user, 'student_profile'):
            return PlacementRecord.objects.filter(student=user.student_profile).select_related('drive__company')
        if hasattr(user, 'industry_profile'):
            return PlacementRecord.objects.filter(drive__company=user.industry_profile).select_related('student__user', 'drive__company')
        return PlacementRecord.objects.none()

    def perform_create(self, serializer):
        drive = serializer.validated_data.get('drive')
        user = self.request.user
        if not (user.is_staff or user.role == UserRole.SUPER_ADMIN or user.role == UserRole.INSTITUTION_ADMIN):
            if hasattr(user, 'industry_profile') and drive and drive.company != user.industry_profile:
                raise permissions.exceptions.PermissionDenied("You can only create placement records for your own company's placement drives.")
        serializer.save()


