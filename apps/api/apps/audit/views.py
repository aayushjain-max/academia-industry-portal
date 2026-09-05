from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import AuditLog
from .serializers import AuditLogSerializer

class AuditViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AuditLog.objects.all()
    serializer_class = AuditLogSerializer
    permission_classes = [permissions.IsAdminUser]
