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

        # Institution admin can manage projects from their own institution
        if request.user.role == UserRole.INSTITUTION_ADMIN:
            inst_profile = getattr(request.user, 'institution_profile', None)
            if inst_profile:
                obj_inst = getattr(obj, 'institution', None)
                if not obj_inst and hasattr(obj, 'student') and obj.student:
                    obj_inst = getattr(obj.student, 'institution', None)
                if obj_inst and obj_inst == inst_profile.institution:
                    return True

        # Academician can manage if they are the supervisor or creator
        if request.user.role == UserRole.ACADEMICIAN:
            if hasattr(obj, 'supervisor') and obj.supervisor == request.user:
                return True
            if hasattr(obj, 'creator') and obj.creator == request.user:
                return True

        # Student owner check
        if hasattr(obj, 'student') and hasattr(request.user, 'student_profile'):
            if obj.student == request.user.student_profile:
                return True
        if hasattr(obj, 'creator') and obj.creator == request.user:
            return True
        if hasattr(obj, 'user') and obj.user == request.user:
            return True
        return False

