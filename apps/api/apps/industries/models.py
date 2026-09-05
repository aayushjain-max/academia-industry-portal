import uuid
from django.db import models
from django.conf import settings

class IndustryProfile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='industry_profile')
    company_name = models.CharField(max_length=255)
    website = models.URLField(blank=True, default='')
    industry_sector = models.CharField(max_length=150, blank=True, default='Technology')
    company_size = models.CharField(max_length=50, blank=True, default='11-50')
    headquarters = models.CharField(max_length=255, blank=True, default='')
    description = models.TextField(blank=True, default='')
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"IndustryProfile: {self.company_name} ({self.user.email})"

