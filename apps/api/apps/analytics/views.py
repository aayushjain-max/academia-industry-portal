from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import *
from .serializers import AnalyticsSerializer
from .services import *

class AnalyticsViewSet(viewsets.ModelViewSet):
    queryset = (AnalyticsItem if 'analytics' != 'users' else User).objects.all()
    serializer_class = AnalyticsSerializer
    permission_classes = [permissions.IsAuthenticated]
