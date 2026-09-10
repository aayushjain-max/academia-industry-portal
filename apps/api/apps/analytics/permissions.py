from rest_framework import permissions
from common.constants.roles import UserRole

class AnalyticsPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if not (request.user and request.user.is_authenticated):
            return False
        if getattr(request.user, 'role', None) == UserRole.STUDENT and not getattr(request.user, 'is_staff', False):
            return False
        if getattr(request, 'method', 'GET') in permissions.SAFE_METHODS:
            return True
        # Creating/updating snapshots requires institution admin, faculty, industry, or staff
        return getattr(request.user, 'role', None) in [UserRole.INSTITUTION_ADMIN, UserRole.ACADEMICIAN, UserRole.INDUSTRY, UserRole.SUPER_ADMIN] or getattr(request.user, 'is_staff', False)
