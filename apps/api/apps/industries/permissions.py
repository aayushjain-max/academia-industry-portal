from rest_framework import permissions

class CustomAppPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        return True
