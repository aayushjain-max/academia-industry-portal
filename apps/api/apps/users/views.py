from rest_framework import viewsets, permissions
from .models import User
from .serializers import UserSerializer, UserUpdateSerializer, AdminUserUpdateSerializer

class UsersViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.action in ['update', 'partial_update']:
            if self.request.user.is_staff or getattr(self.request.user, 'role', '') == 'SUPER_ADMIN':
                return AdminUserUpdateSerializer
            return UserUpdateSerializer
        return UserSerializer
