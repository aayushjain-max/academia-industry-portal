from rest_framework import permissions
from common.constants.roles import UserRole

class RoleManagementPermission(permissions.BasePermission):
    """Only Super Administrators or staff can modify roles and permission matrices."""
    def has_permission(self, request, view):
        if not (request.user and request.user.is_authenticated):
            return False
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_staff or request.user.is_superuser or request.user.role == UserRole.SUPER_ADMIN
