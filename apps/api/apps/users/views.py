from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import *
from .serializers import UsersSerializer
from .services import *

class UsersViewSet(viewsets.ModelViewSet):
    queryset = (UsersItem if 'users' != 'users' else User).objects.all()
    serializer_class = UsersSerializer
    permission_classes = [permissions.IsAuthenticated]
