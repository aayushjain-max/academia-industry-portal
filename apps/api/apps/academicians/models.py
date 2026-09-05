import uuid
from django.db import models
from django.conf import settings

class AcademicianProfile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='academician_profile'
    )
    institution_name = models.CharField(max_length=255, blank=True, default='')
    department = models.CharField(max_length=150, blank=True, default='')
    designation = models.CharField(max_length=100, blank=True, default='Assistant Professor')
    qualifications = models.CharField(max_length=255, blank=True, default='Ph.D.')
    experience_years = models.PositiveIntegerField(default=5)
    areas_of_expertise = models.TextField(blank=True, default='')
    publications = models.TextField(blank=True, default='')
    research_interests = models.TextField(blank=True, default='')
    industry_training_interests = models.TextField(blank=True, default='')
    consultancy_areas = models.TextField(blank=True, default='')
    bio = models.TextField(blank=True, default='')
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Academician: {self.user.email} ({self.designation}, {self.department})"

