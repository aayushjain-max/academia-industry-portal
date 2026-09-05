from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import PlacementDrive, PlacementRecord
from .serializers import PlacementDriveSerializer, PlacementRecordSerializer

class PlacementDriveViewSet(viewsets.ModelViewSet):
    queryset = PlacementDrive.objects.select_related('company').all()
    serializer_class = PlacementDriveSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return super().get_permissions()

    def perform_create(self, serializer):
        industry_profile = getattr(self.request.user, 'industry_profile', None)
        if not industry_profile:
            raise permissions.exceptions.PermissionDenied("Only industry recruiters can host placement drives.")
        serializer.save(company=industry_profile)

class PlacementRecordViewSet(viewsets.ModelViewSet):
    serializer_class = PlacementRecordSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if hasattr(user, 'student_profile'):
            return PlacementRecord.objects.filter(student=user.student_profile).select_related('drive__company')
        return PlacementRecord.objects.select_related('student__user', 'drive__company').all()

