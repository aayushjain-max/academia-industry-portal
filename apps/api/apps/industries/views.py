from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import *
from .serializers import IndustriesSerializer
from .services import *

class IndustriesViewSet(viewsets.ModelViewSet):
    queryset = (IndustriesItem if 'industries' != 'users' else User).objects.all()
    serializer_class = IndustriesSerializer
    permission_classes = [permissions.IsAuthenticated]
