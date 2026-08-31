from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import *
from .serializers import LearningSerializer
from .services import *

class LearningViewSet(viewsets.ModelViewSet):
    queryset = (LearningItem if 'learning' != 'users' else User).objects.all()
    serializer_class = LearningSerializer
    permission_classes = [permissions.IsAuthenticated]
