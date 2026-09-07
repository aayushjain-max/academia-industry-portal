from rest_framework import permissions
from common.constants.roles import UserRole

class MentorshipPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated)

    def has_object_permission(self, request, view, obj):
        if not (request.user and request.user.is_authenticated):
            return False
        if request.user.is_staff or request.user.is_superuser or request.user.role == UserRole.SUPER_ADMIN:
            return True
        if hasattr(obj, 'mentor') and hasattr(request.user, 'academician_profile') and obj.mentor == request.user.academician_profile:
            return True
        if hasattr(obj, 'student') and hasattr(request.user, 'student_profile') and obj.student == request.user.student_profile:
            return True
        if hasattr(obj, 'user'):
            return obj.user == request.user
        return False
