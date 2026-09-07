import os
import uuid
from django.conf import settings
from django.core.files.storage import default_storage
from rest_framework import viewsets, permissions, status, parsers, exceptions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Document
from .serializers import DocumentSerializer, PresignedUrlRequestSerializer
from .validators import validate_uploaded_file
from common.permissions.object_permissions import IsOwnerOrAdmin

class DocumentViewSet(viewsets.ModelViewSet):
    serializer_class = DocumentSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdmin]
    parser_classes = [parsers.MultiPartParser, parsers.FormParser, parsers.JSONParser]

    def get_queryset(self):
        user = self.request.user
        if not user or not user.is_authenticated:
            return Document.objects.none()
        if user.is_staff or user.is_superuser or getattr(user, 'role', '') == 'SUPER_ADMIN':
            return Document.objects.all().select_related('user')
        return Document.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['post'], url_path='upload', parser_classes=[parsers.MultiPartParser, parsers.FormParser])
    def direct_upload(self, request):
        """
        Direct multipart file upload endpoint.
        Validates file integrity and saves uploaded file securely under user's isolated storage directory.
        """
        uploaded_file = request.FILES.get('file')
        if not uploaded_file:
            return Response({"error": "No file provided in request.FILES['file']"}, status=status.HTTP_400_BAD_REQUEST)

        # Validate file
        validate_uploaded_file(uploaded_file)

        doc_type = request.data.get('document_type', 'RESUME')
        title = request.data.get('title', uploaded_file.name)

        # Sanitize filename & create unique path
        ext = os.path.splitext(uploaded_file.name)[1].lower()
        unique_name = f"{uuid.uuid4()}{ext}"
        relative_path = f"uploads/{request.user.id}/{unique_name}"
        
        saved_path = default_storage.save(relative_path, uploaded_file)
        file_url = f"{settings.MEDIA_URL}{saved_path}"

        doc = Document.objects.create(
            user=request.user,
            title=title,
            document_type=doc_type,
            file_url=file_url,
            file_size_bytes=uploaded_file.size,
            mime_type=getattr(uploaded_file, 'content_type', 'application/octet-stream')
        )

        return Response(self.get_serializer(doc).data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['post'], url_path='presigned-url')
    def presigned_url(self, request):
        serializer = PresignedUrlRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        filename = serializer.validated_data['filename']
        doc_type = serializer.validated_data.get('document_type', 'RESUME')
        
        ext = os.path.splitext(filename)[1].lower()
        unique_name = f"{uuid.uuid4()}{ext}"
        key = f"uploads/{request.user.id}/{unique_name}"
        file_url = f"{settings.MEDIA_URL}{key}"
        
        upload_url = f"/api/v1/documents/upload/"
        
        return Response({
            "uploadUrl": upload_url,
            "fileUrl": file_url,
            "key": key
        }, status=status.HTTP_200_OK)
