from rest_framework.permissions import BasePermission

class IsOwnerOrAdmin(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user.is_staff or request.user.role == 'SUPER_ADMIN':
            return True
        return getattr(obj, 'user', None) == request.user or obj == request.user
