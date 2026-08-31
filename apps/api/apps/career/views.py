from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import *
from .serializers import CareerSerializer
from .services import *

class CareerViewSet(viewsets.ModelViewSet):
    queryset = (CareerItem if 'career' != 'users' else User).objects.all()
    serializer_class = CareerSerializer
    permission_classes = [permissions.IsAuthenticated]
