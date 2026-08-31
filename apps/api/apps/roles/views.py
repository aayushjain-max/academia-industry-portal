from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import *
from .serializers import RolesSerializer
from .services import *

class RolesViewSet(viewsets.ModelViewSet):
    queryset = (RolesItem if 'roles' != 'users' else User).objects.all()
    serializer_class = RolesSerializer
    permission_classes = [permissions.IsAuthenticated]
