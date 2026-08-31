from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import *
from .serializers import AuditSerializer
from .services import *

class AuditViewSet(viewsets.ModelViewSet):
    queryset = (AuditItem if 'audit' != 'users' else User).objects.all()
    serializer_class = AuditSerializer
    permission_classes = [permissions.IsAuthenticated]
