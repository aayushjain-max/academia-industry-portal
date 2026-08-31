from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import *
from .serializers import InternshipsSerializer
from .services import *

class InternshipsViewSet(viewsets.ModelViewSet):
    queryset = (InternshipsItem if 'internships' != 'users' else User).objects.all()
    serializer_class = InternshipsSerializer
    permission_classes = [permissions.IsAuthenticated]
