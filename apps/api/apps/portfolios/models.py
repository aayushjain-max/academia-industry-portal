import uuid
from django.db import models
from django.conf import settings

class DigitalPortfolio(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    student = models.OneToOneField(
        'students.StudentProfile',
        on_delete=models.CASCADE,
        related_name='digital_portfolio'
    )
    username = models.SlugField(max_length=100, unique=True)
    custom_theme = models.CharField(max_length=50, default='default')
    achievements = models.JSONField(default=list, blank=True)
    is_public = models.BooleanField(default=True)
    views_count = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-views_count']

    def __str__(self):
        return f"Portfolio: {self.username} ({self.student.user.email})"

