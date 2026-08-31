from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import *
from .serializers import AuthenticationSerializer
from .services import *

class AuthenticationViewSet(viewsets.ModelViewSet):
    queryset = (AuthenticationItem if 'authentication' != 'users' else User).objects.all()
    serializer_class = AuthenticationSerializer
    permission_classes = [permissions.IsAuthenticated]
