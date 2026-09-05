import uuid
from django.db import models
from django.conf import settings

class Certification(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending Verification'),
        ('VERIFIED', 'Verified'),
        ('REJECTED', 'Rejected'),
    ]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    student = models.ForeignKey(
        'students.StudentProfile',
        on_delete=models.CASCADE,
        related_name='certifications'
    )
    title = models.CharField(max_length=255)
    issuing_organization = models.CharField(max_length=200)
    issue_date = models.DateField()
    expiry_date = models.DateField(null=True, blank=True)
    credential_id = models.CharField(max_length=150, blank=True, default='')
    credential_url = models.URLField(blank=True, default='')
    verification_status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    skills_covered = models.JSONField(default=list, blank=True)
    certificate_file = models.FileField(upload_to='certificates/', null=True, blank=True)
    verifier_notes = models.TextField(blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-issue_date']

    def __str__(self):
        return f"{self.title} - {self.issuing_organization} ({self.student.user.email})"

