from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import *
from .serializers import InstitutionsSerializer
from .services import *

class InstitutionsViewSet(viewsets.ModelViewSet):
    queryset = (InstitutionsItem if 'institutions' != 'users' else User).objects.all()
    serializer_class = InstitutionsSerializer
    permission_classes = [permissions.IsAuthenticated]
