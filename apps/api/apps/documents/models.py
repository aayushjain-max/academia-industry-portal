import uuid
from django.db import models
from django.conf import settings

class Document(models.Model):
    DOCUMENT_TYPES = [
        ('RESUME', 'Resume / CV'),
        ('CERTIFICATE', 'Certificate'),
        ('TRANSCRIPT', 'Academic Transcript'),
        ('ID_PROOF', 'ID Verification Proof'),
        ('OTHER', 'Other Document'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='documents')
    title = models.CharField(max_length=255)
    document_type = models.CharField(max_length=30, choices=DOCUMENT_TYPES, default='RESUME')
    file_url = models.CharField(max_length=500)
    file_size_bytes = models.PositiveIntegerField(default=0)
    mime_type = models.CharField(max_length=100, default='application/pdf')
    is_verified = models.BooleanField(default=False)
    verified_at = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.email} - {self.title} ({self.document_type})"
