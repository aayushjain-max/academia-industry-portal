from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import *
from .serializers import ApplicationsSerializer
from .services import *

class ApplicationsViewSet(viewsets.ModelViewSet):
    queryset = (ApplicationsItem if 'applications' != 'users' else User).objects.all()
    serializer_class = ApplicationsSerializer
    permission_classes = [permissions.IsAuthenticated]
