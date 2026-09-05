import uuid
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Document
from .serializers import DocumentSerializer, PresignedUrlRequestSerializer

class DocumentViewSet(viewsets.ModelViewSet):
    serializer_class = DocumentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Document.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['post'], url_path='presigned-url')
    def presigned_url(self, request):
        serializer = PresignedUrlRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        filename = serializer.validated_data['filename']
        key = f"uploads/{request.user.id}/{uuid.uuid4()}-{filename}"
        upload_url = f"https://mock-s3.portal.local/{key}?signature=mock_signed_token"
        file_url = f"/media/{key}"
        return Response({
            "uploadUrl": upload_url,
            "fileUrl": file_url
        })
