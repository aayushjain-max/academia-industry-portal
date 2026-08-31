from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import *
from .serializers import NotificationsSerializer
from .services import *

class NotificationsViewSet(viewsets.ModelViewSet):
    queryset = (NotificationsItem if 'notifications' != 'users' else User).objects.all()
    serializer_class = NotificationsSerializer
    permission_classes = [permissions.IsAuthenticated]
