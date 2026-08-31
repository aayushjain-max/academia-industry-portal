from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import *
from .serializers import VerificationSerializer
from .services import *

class VerificationViewSet(viewsets.ModelViewSet):
    queryset = (VerificationItem if 'verification' != 'users' else User).objects.all()
    serializer_class = VerificationSerializer
    permission_classes = [permissions.IsAuthenticated]
