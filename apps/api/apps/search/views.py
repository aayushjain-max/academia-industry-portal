from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import *
from .serializers import SearchSerializer
from .services import *

class SearchViewSet(viewsets.ModelViewSet):
    queryset = (SearchItem if 'search' != 'users' else User).objects.all()
    serializer_class = SearchSerializer
    permission_classes = [permissions.IsAuthenticated]
