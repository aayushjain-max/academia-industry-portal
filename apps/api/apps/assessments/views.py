from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import *
from .serializers import AssessmentsSerializer
from .services import *

class AssessmentsViewSet(viewsets.ModelViewSet):
    queryset = (AssessmentsItem if 'assessments' != 'users' else User).objects.all()
    serializer_class = AssessmentsSerializer
    permission_classes = [permissions.IsAuthenticated]
