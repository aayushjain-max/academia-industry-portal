import uuid
from django.db import models
from django.conf import settings

import hashlib

from django.utils import timezone

class SkillPassport(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    student = models.OneToOneField(
        'students.StudentProfile',
        on_delete=models.CASCADE,
        related_name='skill_passport'
    )
    passport_number = models.CharField(max_length=50, unique=True)
    qr_code_payload = models.TextField(blank=True, default='')
    verified_credentials_snapshot = models.JSONField(default=list, blank=True)
    cryptographic_signature = models.CharField(max_length=256, blank=True, default='')
    is_valid = models.BooleanField(default=True)
    issued_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-issued_at']

    def save(self, *args, **kwargs):
        if not self.issued_at:
            self.issued_at = timezone.now()
        if not self.passport_number:
            self.passport_number = f"SP-{str(self.id)[:8].upper()}"
        if not self.cryptographic_signature:
            raw_sig = f"{self.passport_number}:{self.student.user.email}:{self.issued_at.isoformat()}"
            self.cryptographic_signature = hashlib.sha256(raw_sig.encode()).hexdigest()
        if not self.qr_code_payload:
            public_url = getattr(settings, 'PORTAL_PUBLIC_URL', 'http://localhost:3000').rstrip('/')
            self.qr_code_payload = f"{public_url}/verify/passport/{self.cryptographic_signature}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Passport: {self.passport_number} ({self.student.user.email})"

