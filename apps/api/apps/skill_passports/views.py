from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import *
from .serializers import SkillPassportsSerializer
from .services import *

class SkillPassportsViewSet(viewsets.ModelViewSet):
    queryset = (SkillPassportsItem if 'skill_passports' != 'users' else User).objects.all()
    serializer_class = SkillPassportsSerializer
    permission_classes = [permissions.IsAuthenticated]
