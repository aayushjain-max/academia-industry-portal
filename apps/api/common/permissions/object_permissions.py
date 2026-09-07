from rest_framework.permissions import BasePermission, SAFE_METHODS
from common.constants.roles import UserRole

class IsOwnerOrAdmin(BasePermission):
    """
    Object-level permission to only allow owners of an object or super admins to view/edit it.
    """
    def has_object_permission(self, request, view, obj):
        if not (request.user and request.user.is_authenticated):
            return False
        if request.user.is_superuser or request.user.is_staff or request.user.role == UserRole.SUPER_ADMIN:
            return True
        
        # Check direct user reference
        if hasattr(obj, 'user'):
            return obj.user == request.user
        if hasattr(obj, 'student') and hasattr(obj.student, 'user'):
            return obj.student.user == request.user
        if hasattr(obj, 'creator'):
            return obj.creator == request.user
        if hasattr(obj, 'owner'):
            return obj.owner == request.user
        if hasattr(obj, 'email'):
            return obj == request.user
        return obj == request.user

class IsOpportunityOwner(BasePermission):
    """
    Object-level permission to only allow creator/industry owner of the opportunity or super admins.
    """
    def has_object_permission(self, request, view, obj):
        if not (request.user and request.user.is_authenticated):
            return False
        if request.user.is_superuser or request.user.is_staff or request.user.role == UserRole.SUPER_ADMIN:
            return True
        if request.method in SAFE_METHODS:
            return True
        if hasattr(obj, 'industry') and hasattr(request.user, 'industry_profile'):
            return obj.industry == request.user.industry_profile
        if hasattr(obj, 'creator'):
            return obj.creator == request.user
        return False

class IsApplicationOwnerOrRecruiter(BasePermission):
    """
    Object-level permission allowing:
    - The applying student to view/withdraw their application.
    - The recruiter who posted the opportunity to view/update status.
    - Super admins to manage applications.
    """
    def has_object_permission(self, request, view, obj):
        if not (request.user and request.user.is_authenticated):
            return False
        if request.user.is_superuser or request.user.is_staff or request.user.role == UserRole.SUPER_ADMIN:
            return True
        
        # Check if student owner
        if hasattr(request.user, 'student_profile') and obj.student == request.user.student_profile:
            return True
        
        # Check if industry owner of opportunity
        if hasattr(request.user, 'industry_profile') and hasattr(obj, 'opportunity') and obj.opportunity.industry == request.user.industry_profile:
            return True

        return False

class CanUpdateApplicationStatus(BasePermission):
    """
    Status changes (ACCEPTED, REJECTED, SHORTLISTED, HIRED) can ONLY be executed by
    the recruiter who owns the opportunity or an administrator.
    """
    def has_object_permission(self, request, view, obj):
        if not (request.user and request.user.is_authenticated):
            return False
        if request.user.is_superuser or request.user.is_staff or request.user.role == UserRole.SUPER_ADMIN:
            return True
        if hasattr(request.user, 'industry_profile') and hasattr(obj, 'opportunity') and obj.opportunity.industry == request.user.industry_profile:
            return True
        return False
