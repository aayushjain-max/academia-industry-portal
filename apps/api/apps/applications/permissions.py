from rest_framework import permissions

class IsApplicationOwnerOrTargetIndustry(permissions.BasePermission):
    """
    Object-level permission:
    - Students can only view their own applications.
    - Industry users can only view/manage applications for their opportunities.
    - Staff / Admins can access all applications.
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated)

    def has_object_permission(self, request, view, obj):
        user = request.user
        if user.is_staff or user.is_superuser:
            return True

        if hasattr(user, 'student_profile') and obj.student == user.student_profile:
            return True

        if hasattr(user, 'industry_profile') and obj.opportunity.industry == user.industry_profile:
            return True

        return False


class CanUpdateApplicationStatus(permissions.BasePermission):
    """
    Strict permission for updating application status:
    Only the Industry profile that owns the opportunity (or staff/admin) can update status.
    Students are strictly forbidden from altering application status.
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated)

    def has_object_permission(self, request, view, obj):
        user = request.user
        if user.is_staff or user.is_superuser:
            return True

        if hasattr(user, 'industry_profile') and obj.opportunity.industry == user.industry_profile:
            return True

        return False
