from rest_framework import viewsets, permissions
from .models import User
from .serializers import UserSerializer, UserUpdateSerializer, AdminUserUpdateSerializer
from common.permissions.object_permissions import IsOwnerOrAdmin

class UsersViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdmin]

    def get_queryset(self):
        user = self.request.user
        if not user or not user.is_authenticated:
            return User.objects.none()
        if user.is_staff or user.is_superuser or getattr(user, 'role', '') == 'SUPER_ADMIN':
            return User.objects.all()
        return User.objects.filter(id=user.id)

    def get_permissions(self):
        if self.action in ['list', 'create', 'destroy']:
            return [permissions.IsAdminUser()]
        return [permissions.IsAuthenticated(), IsOwnerOrAdmin()]

    def get_serializer_class(self):
        if self.action in ['update', 'partial_update']:
            if self.request.user.is_staff or getattr(self.request.user, 'role', '') == 'SUPER_ADMIN':
                return AdminUserUpdateSerializer
            return UserUpdateSerializer
        return UserSerializer
