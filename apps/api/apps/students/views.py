from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import *
from .serializers import StudentsSerializer
from .services import *

class StudentsViewSet(viewsets.ModelViewSet):
    queryset = (StudentsItem if 'students' != 'users' else User).objects.all()
    serializer_class = StudentsSerializer
    permission_classes = [permissions.IsAuthenticated]
