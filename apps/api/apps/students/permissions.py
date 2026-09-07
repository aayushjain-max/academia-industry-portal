from rest_framework import permissions
from common.constants.roles import UserRole

class StudentPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if not (request.user and request.user.is_authenticated):
            return False
        return True

    def has_object_permission(self, request, view, obj):
        if not (request.user and request.user.is_authenticated):
            return False
        if request.user.is_staff or request.user.is_superuser or request.user.role == UserRole.SUPER_ADMIN:
            return True
        # Read-only access for verified recruiters or institution admins
        if request.method in permissions.SAFE_METHODS:
            if request.user.role in [UserRole.INDUSTRY, UserRole.INSTITUTION_ADMIN, UserRole.ACADEMICIAN]:
                return True
        # Updates only allowed by the student themselves
        if hasattr(obj, 'user'):
            return obj.user == request.user
        return obj == request.user
