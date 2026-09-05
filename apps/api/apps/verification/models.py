import uuid
from django.db import models
from django.conf import settings

class VerificationRecord(models.Model):
    RECORD_TYPES = [
        ('PASSPORT', 'Skill Passport'),
        ('CERTIFICATE', 'Certification'),
        ('DEGREE', 'Academic Degree'),
        ('PROJECT', 'Live Project'),
    ]
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('VERIFIED', 'Verified'),
        ('REJECTED', 'Rejected'),
        ('REVOKED', 'Revoked'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    verification_code = models.CharField(max_length=100, unique=True, db_index=True)
    record_type = models.CharField(max_length=30, choices=RECORD_TYPES)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='verifications')
    verified_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='verified_records')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='VERIFIED')
    metadata = models.JSONField(default=dict)
    verified_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-verified_at']

    def __str__(self):
        return f"{self.verification_code} - {self.record_type} ({self.status})"
