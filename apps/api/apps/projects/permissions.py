from rest_framework import permissions
from common.constants.roles import UserRole

class ProjectPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if not (request.user and request.user.is_authenticated):
            return False
        return True

    def has_object_permission(self, request, view, obj):
        if not (request.user and request.user.is_authenticated):
            return False
        if request.method in permissions.SAFE_METHODS:
            return True
        if request.user.is_staff or request.user.is_superuser or request.user.role == UserRole.SUPER_ADMIN:
            return True
        if hasattr(obj, 'creator'):
            return obj.creator == request.user
        if hasattr(obj, 'user'):
            return obj.user == request.user
        return False
