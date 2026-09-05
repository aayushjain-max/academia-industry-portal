from rest_framework import serializers
from .models import Document

class DocumentSerializer(serializers.ModelSerializer):
    userId = serializers.CharField(source='user_id', read_only=True)
    fileUrl = serializers.CharField(source='file_url')
    documentType = serializers.CharField(source='document_type')
    fileSizeBytes = serializers.IntegerField(source='file_size_bytes', required=False)
    mimeType = serializers.CharField(source='mime_type', required=False)
    isVerified = serializers.BooleanField(source='is_verified', read_only=True)
    createdAt = serializers.DateTimeField(source='created_at', read_only=True)

    class Meta:
        model = Document
        fields = ['id', 'userId', 'title', 'documentType', 'fileUrl', 'fileSizeBytes', 'mimeType', 'isVerified', 'createdAt']

class PresignedUrlRequestSerializer(serializers.Serializer):
    filename = serializers.CharField(max_length=255)
    contentType = serializers.CharField(max_length=100, default='application/pdf')
