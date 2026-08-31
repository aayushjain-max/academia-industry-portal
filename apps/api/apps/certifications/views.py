from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import *
from .serializers import CertificationsSerializer
from .services import *

class CertificationsViewSet(viewsets.ModelViewSet):
    queryset = (CertificationsItem if 'certifications' != 'users' else User).objects.all()
    serializer_class = CertificationsSerializer
    permission_classes = [permissions.IsAuthenticated]
