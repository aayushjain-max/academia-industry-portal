from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import *
from .serializers import SkillGapsSerializer
from .services import *

class SkillGapsViewSet(viewsets.ModelViewSet):
    queryset = (SkillGapsItem if 'skill_gaps' != 'users' else User).objects.all()
    serializer_class = SkillGapsSerializer
    permission_classes = [permissions.IsAuthenticated]
