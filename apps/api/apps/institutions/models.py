import uuid
from django.db import models
from django.conf import settings

class InstitutionType(models.TextChoices):
    UNIVERSITY = 'UNIVERSITY', 'University'
    ENGINEERING_COLLEGE = 'ENGINEERING_COLLEGE', 'Engineering College'
    POLYTECHNIC = 'POLYTECHNIC', 'Polytechnic Institute'
    ARTS_SCIENCE = 'ARTS_SCIENCE', 'Arts & Science College'
    MANAGEMENT = 'MANAGEMENT', 'Management Institute'
    OTHER = 'OTHER', 'Other'

class InstitutionProfile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='institution_profile',
        null=True,
        blank=True
    )
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=50, blank=True, default='')
    institution_type = models.CharField(
        max_length=50,
        choices=InstitutionType.choices,
        default=InstitutionType.ENGINEERING_COLLEGE
    )
    accreditation = models.CharField(max_length=100, blank=True, default='NAAC A+')
    address = models.TextField(blank=True, default='')
    city = models.CharField(max_length=100, blank=True, default='')
    state = models.CharField(max_length=100, blank=True, default='')
    country = models.CharField(max_length=100, default='India')
    website = models.URLField(blank=True, default='')
    contact_email = models.EmailField(blank=True, default='')
    contact_phone = models.CharField(max_length=30, blank=True, default='')
    is_verified = models.BooleanField(default=False)
    total_students_enrolled = models.PositiveIntegerField(default=0)
    placement_rate = models.DecimalField(max_digits=5, decimal_places=2, default=0.0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return f"Institution: {self.name} ({self.code or self.city})"

