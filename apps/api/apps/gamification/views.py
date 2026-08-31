from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import *
from .serializers import GamificationSerializer
from .services import *

class GamificationViewSet(viewsets.ModelViewSet):
    queryset = (GamificationItem if 'gamification' != 'users' else User).objects.all()
    serializer_class = GamificationSerializer
    permission_classes = [permissions.IsAuthenticated]
