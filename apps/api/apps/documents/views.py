from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import *
from .serializers import DocumentsSerializer
from .services import *

class DocumentsViewSet(viewsets.ModelViewSet):
    queryset = (DocumentsItem if 'documents' != 'users' else User).objects.all()
    serializer_class = DocumentsSerializer
    permission_classes = [permissions.IsAuthenticated]
