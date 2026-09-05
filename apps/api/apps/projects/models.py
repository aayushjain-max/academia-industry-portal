import uuid
from django.db import models
from django.conf import settings

class ProjectType(models.TextChoices):
    ACADEMIC = 'ACADEMIC', 'Academic Project'
    INDUSTRY_LIVE = 'INDUSTRY_LIVE', 'Industry Live Project'
    CAPSTONE = 'CAPSTONE', 'Capstone Project'
    OPEN_SOURCE = 'OPEN_SOURCE', 'Open Source Contribution'

class Project(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    student = models.ForeignKey(
        'students.StudentProfile',
        on_delete=models.CASCADE,
        related_name='projects'
    )
    title = models.CharField(max_length=255)
    description = models.TextField()
    project_type = models.CharField(
        max_length=30,
        choices=ProjectType.choices,
        default=ProjectType.ACADEMIC
    )
    industry_partner = models.ForeignKey(
        'industries.IndustryProfile',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='sponsored_projects'
    )
    skills_used = models.JSONField(default=list, blank=True)
    repo_url = models.URLField(blank=True, default='')
    live_demo_url = models.URLField(blank=True, default='')
    media_urls = models.JSONField(default=list, blank=True)
    is_verified = models.BooleanField(default=False)
    completion_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} ({self.student.user.email})"

