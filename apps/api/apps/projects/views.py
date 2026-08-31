from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import *
from .serializers import ProjectsSerializer
from .services import *

class ProjectsViewSet(viewsets.ModelViewSet):
    queryset = (ProjectsItem if 'projects' != 'users' else User).objects.all()
    serializer_class = ProjectsSerializer
    permission_classes = [permissions.IsAuthenticated]
