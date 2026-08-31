from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import *
from .serializers import SkillsSerializer
from .services import *

class SkillsViewSet(viewsets.ModelViewSet):
    queryset = (SkillsItem if 'skills' != 'users' else User).objects.all()
    serializer_class = SkillsSerializer
    permission_classes = [permissions.IsAuthenticated]
