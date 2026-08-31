from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import *
from .serializers import MicroInternshipsSerializer
from .services import *

class MicroInternshipsViewSet(viewsets.ModelViewSet):
    queryset = (MicroInternshipsItem if 'micro_internships' != 'users' else User).objects.all()
    serializer_class = MicroInternshipsSerializer
    permission_classes = [permissions.IsAuthenticated]
