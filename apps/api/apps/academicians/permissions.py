from rest_framework import permissions
from common.constants.roles import UserRole


class IsAcademician(permissions.BasePermission):
    """
    Allows access only to authenticated users with role ACADEMICIAN or SUPER_ADMIN.
    """
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            (
                request.user.role in [UserRole.ACADEMICIAN, UserRole.SUPER_ADMIN, UserRole.INSTITUTION_ADMIN] or
                request.user.is_staff or
                request.user.is_superuser
            )
        )


class IsAcademicianOrReadOnly(permissions.BasePermission):
    """
    Allows read permissions to any authenticated user, but write permissions only to academicians/admins.
    """
    def has_permission(self, request, view):
        if not (request.user and request.user.is_authenticated):
            return False
        if request.method in permissions.SAFE_METHODS:
            return True
        return (
            request.user.role in [UserRole.ACADEMICIAN, UserRole.SUPER_ADMIN, UserRole.INSTITUTION_ADMIN] or
            request.user.is_staff or
            request.user.is_superuser
        )


class IsOwnerAcademician(permissions.BasePermission):
    """
    Object-level permission to ensure only the academician who owns the record (or admin) can modify it.
    """
    def has_object_permission(self, request, view, obj):
        if not (request.user and request.user.is_authenticated):
            return False
        if request.user.is_superuser or request.user.is_staff or request.user.role == UserRole.SUPER_ADMIN:
            return True

        academician_profile = getattr(request.user, 'academician_profile', None)
        if not academician_profile:
            return False

        # Direct AcademicianProfile
        if hasattr(obj, 'user'):
            return obj.user == request.user

        # Child entity with academician FK
        if hasattr(obj, 'academician'):
            return obj.academician == academician_profile

        # Nested research milestone/member/document with project.academician
        if hasattr(obj, 'project') and hasattr(obj.project, 'academician'):
            return obj.project.academician == academician_profile

        return False


class IsHODOrInstitutionAdmin(permissions.BasePermission):
    """
    Grants access to HODs, Institution Admins, or Super Admins for department/institution analytics.
    """
    def has_permission(self, request, view):
        if not (request.user and request.user.is_authenticated):
            return False
        if request.user.is_superuser or request.user.is_staff or request.user.role in [UserRole.SUPER_ADMIN, UserRole.INSTITUTION_ADMIN]:
            return True
        
        # Check if academician is HOD
        profile = getattr(request.user, 'academician_profile', None)
        if profile and profile.designation and 'hod' in profile.designation.lower():
            return True

        return False
