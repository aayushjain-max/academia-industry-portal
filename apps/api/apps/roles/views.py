from rest_framework import viewsets, permissions
from .models import RoleDefinition
from .serializers import RoleDefinitionSerializer

class RoleDefinitionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = RoleDefinition.objects.filter(is_active=True)
    serializer_class = RoleDefinitionSerializer
    permission_classes = [permissions.AllowAny]

