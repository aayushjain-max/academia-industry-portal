from rest_framework import permissions
from common.constants.roles import UserRole

class InternshipPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if not (request.user and request.user.is_authenticated):
            return False
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.role in [UserRole.INDUSTRY, UserRole.INSTITUTION_ADMIN, UserRole.SUPER_ADMIN] or request.user.is_staff

    def has_object_permission(self, request, view, obj):
        if not (request.user and request.user.is_authenticated):
            return False
        if request.method in permissions.SAFE_METHODS:
            return True
        if request.user.is_staff or request.user.is_superuser or request.user.role == UserRole.SUPER_ADMIN:
            return True
        if hasattr(obj, 'opportunity') and hasattr(request.user, 'industry_profile'):
            return obj.opportunity.industry == request.user.industry_profile
        return False

