from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import *
from .serializers import OpportunitiesSerializer
from .services import *

class OpportunitiesViewSet(viewsets.ModelViewSet):
    queryset = (OpportunitiesItem if 'opportunities' != 'users' else User).objects.all()
    serializer_class = OpportunitiesSerializer
    permission_classes = [permissions.IsAuthenticated]
