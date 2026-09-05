import uuid
from django.db import models
from django.conf import settings

class RoleDefinition(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    role_code = models.CharField(max_length=50, unique=True)
    display_name = models.CharField(max_length=100)
    description = models.TextField(blank=True, default='')
    permissions = models.JSONField(default=list, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['display_name']

    def __str__(self):
        return f"{self.display_name} ({self.role_code})"

