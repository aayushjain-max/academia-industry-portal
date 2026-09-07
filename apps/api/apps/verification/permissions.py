from rest_framework import permissions
from common.constants.roles import UserRole

class VerificationPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if not (request.user and request.user.is_authenticated):
            return False
        if request.method in permissions.SAFE_METHODS:
            return True
        # Only academicians, institution admins, or super admins can verify credentials
        return request.user.role in [UserRole.ACADEMICIAN, UserRole.INSTITUTION_ADMIN, UserRole.SUPER_ADMIN] or request.user.is_staff
