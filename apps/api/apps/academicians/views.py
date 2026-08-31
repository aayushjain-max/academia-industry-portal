from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import *
from .serializers import AcademiciansSerializer
from .services import *

class AcademiciansViewSet(viewsets.ModelViewSet):
    queryset = (AcademiciansItem if 'academicians' != 'users' else User).objects.all()
    serializer_class = AcademiciansSerializer
    permission_classes = [permissions.IsAuthenticated]
