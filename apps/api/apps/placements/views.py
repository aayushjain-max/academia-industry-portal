from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import *
from .serializers import PlacementsSerializer
from .services import *

class PlacementsViewSet(viewsets.ModelViewSet):
    queryset = (PlacementsItem if 'placements' != 'users' else User).objects.all()
    serializer_class = PlacementsSerializer
    permission_classes = [permissions.IsAuthenticated]
