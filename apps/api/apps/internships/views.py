from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import InternshipPosting
from .serializers import InternshipPostingSerializer

class InternshipPostingViewSet(viewsets.ModelViewSet):
    queryset = InternshipPosting.objects.select_related('opportunity__industry').all()
    serializer_class = InternshipPostingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return super().get_permissions()

