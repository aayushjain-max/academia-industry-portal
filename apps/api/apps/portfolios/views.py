from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import *
from .serializers import PortfoliosSerializer
from .services import *

class PortfoliosViewSet(viewsets.ModelViewSet):
    queryset = (PortfoliosItem if 'portfolios' != 'users' else User).objects.all()
    serializer_class = PortfoliosSerializer
    permission_classes = [permissions.IsAuthenticated]
