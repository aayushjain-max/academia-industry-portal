from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import VerificationRecord
from .serializers import VerificationRecordSerializer
from django.shortcuts import get_object_or_404

class VerificationViewSet(viewsets.ModelViewSet):
    queryset = VerificationRecord.objects.all()
    serializer_class = VerificationRecordSerializer
    permission_classes = [permissions.AllowAny]

    def retrieve(self, request, pk=None):
        # Look up by ID or verification_code
        try:
            record = VerificationRecord.objects.get(id=pk)
        except Exception:
            record = get_object_or_404(VerificationRecord, verification_code=pk)

        serializer = self.get_serializer(record)
        return Response({
            "verified": record.status == 'VERIFIED',
            "record": serializer.data
        })
