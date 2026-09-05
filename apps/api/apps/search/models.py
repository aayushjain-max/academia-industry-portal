import uuid
from django.db import models
from django.conf import settings

class SearchHistory(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='search_history', null=True, blank=True)
    query = models.CharField(max_length=255)
    category = models.CharField(max_length=50, blank=True, default='all')
    results_count = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.query} ({self.category})"
