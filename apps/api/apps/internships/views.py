from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import InternshipPosting
from .serializers import InternshipPostingSerializer
from .permissions import InternshipPermission
from common.permissions.object_permissions import IsOpportunityOwner

from common.constants.roles import UserRole

class InternshipPostingViewSet(viewsets.ModelViewSet):
    queryset = InternshipPosting.objects.select_related('opportunity__industry').all()
    serializer_class = InternshipPostingSerializer
    permission_classes = [InternshipPermission, IsOpportunityOwner]

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [InternshipPermission(), IsOpportunityOwner()]

    def perform_create(self, serializer):
        user = self.request.user
        opportunity = serializer.validated_data.get('opportunity')
        if not (user.is_staff or user.role == UserRole.SUPER_ADMIN):
            if hasattr(user, 'industry_profile') and opportunity:
                if opportunity.industry != user.industry_profile:
                    raise permissions.exceptions.PermissionDenied("You can only create internship details for your own opportunity postings.")
        serializer.save()


