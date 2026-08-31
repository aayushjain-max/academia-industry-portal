from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import *
from .serializers import SkillProfilesSerializer
from .services import *

class SkillProfilesViewSet(viewsets.ModelViewSet):
    queryset = (SkillProfilesItem if 'skill_profiles' != 'users' else User).objects.all()
    serializer_class = SkillProfilesSerializer
    permission_classes = [permissions.IsAuthenticated]
