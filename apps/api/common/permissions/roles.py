from rest_framework.permissions import BasePermission, SAFE_METHODS
from common.constants.roles import UserRole

class IsSuperAdmin(BasePermission):
    """Allows access only to super administrators or staff with superuser privileges."""
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            (request.user.role == UserRole.SUPER_ADMIN or request.user.is_superuser or request.user.is_staff)
        )

class IsInstitutionAdmin(BasePermission):
    """Allows access to institution administrators or super administrators."""
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            (request.user.role in [UserRole.INSTITUTION_ADMIN, UserRole.SUPER_ADMIN] or request.user.is_staff)
        )

class IsIndustry(BasePermission):
    """Allows access to industry partners or super administrators."""
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            (request.user.role in [UserRole.INDUSTRY, UserRole.SUPER_ADMIN] or request.user.is_staff)
        )

class IsAcademician(BasePermission):
    """Allows access to academician/faculty members or super administrators."""
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            (request.user.role in [UserRole.ACADEMICIAN, UserRole.SUPER_ADMIN] or request.user.is_staff)
        )

class IsStudent(BasePermission):
    """Allows access to student users."""
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            (request.user.role == UserRole.STUDENT or request.user.is_staff or request.user.role == UserRole.SUPER_ADMIN)
        )

class CanManageOpportunity(BasePermission):
    """Only industry representatives or institution/super administrators can manage opportunities."""
    def has_permission(self, request, view):
        if not (request.user and request.user.is_authenticated):
            return False
        if request.method in SAFE_METHODS:
            return True
        return request.user.role in [UserRole.INDUSTRY, UserRole.INSTITUTION_ADMIN, UserRole.SUPER_ADMIN] or request.user.is_staff

class CanVerifyCredentials(BasePermission):
    """Only academic faculty, institution admins, or super admins can verify student credentials."""
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            (request.user.role in [UserRole.ACADEMICIAN, UserRole.INSTITUTION_ADMIN, UserRole.SUPER_ADMIN] or request.user.is_staff)
        )

class CanViewAnalytics(BasePermission):
    """Institution admins, academicians, industry partners, and super admins can view aggregate analytics."""
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            (request.user.role in [UserRole.INSTITUTION_ADMIN, UserRole.ACADEMICIAN, UserRole.INDUSTRY, UserRole.SUPER_ADMIN] or request.user.is_staff)
        )
