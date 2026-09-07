from rest_framework import permissions
from common.constants.roles import UserRole

class AnalyticsPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if not (request.user and request.user.is_authenticated):
            return False
        # Public aggregate trends can be viewed, but institutional/system analytics require staff or admin/faculty/industry
        if request.user.role in [UserRole.INSTITUTION_ADMIN, UserRole.ACADEMICIAN, UserRole.INDUSTRY, UserRole.SUPER_ADMIN] or request.user.is_staff:
            return True
        return False
