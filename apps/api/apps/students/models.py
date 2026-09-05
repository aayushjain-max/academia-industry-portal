import uuid
from django.db import models
from django.conf import settings

class StudentProfile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='student_profile')
    institution_name = models.CharField(max_length=255, blank=True, default='')
    roll_number = models.CharField(max_length=100, blank=True, default='')
    degree = models.CharField(max_length=150, blank=True, default='')
    department = models.CharField(max_length=150, blank=True, default='')
    year_of_study = models.PositiveIntegerField(null=True, blank=True, default=1)
    cgpa = models.DecimalField(max_digits=4, decimal_places=2, null=True, blank=True)
    headline = models.CharField(max_length=255, blank=True, default='')
    bio = models.TextField(blank=True, default='')
    resume_url = models.URLField(blank=True, default='')
    github_url = models.URLField(blank=True, default='')
    linkedin_url = models.URLField(blank=True, default='')
    portfolio_url = models.URLField(blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"StudentProfile: {self.user.email} ({self.degree})"

