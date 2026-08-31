from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import *
from .serializers import MentorshipSerializer
from .services import *

class MentorshipViewSet(viewsets.ModelViewSet):
    queryset = (MentorshipItem if 'mentorship' != 'users' else User).objects.all()
    serializer_class = MentorshipSerializer
    permission_classes = [permissions.IsAuthenticated]
