import uuid
from django.db import models
from django.conf import settings

class AnalyticsSnapshot(models.Model):
    SNAPSHOT_TYPES = [
        ('INSTITUTION', 'Institution Overview'),
        ('HEATMAP', 'Skill Demand Heatmap'),
        ('INDUSTRY', 'Industry Trends'),
    ]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    snapshot_type = models.CharField(max_length=30, choices=SNAPSHOT_TYPES)
    data = models.JSONField(default=dict)
    generated_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-generated_at']

    def __str__(self):
        return f"Snapshot: {self.snapshot_type} ({self.generated_at.strftime('%Y-%m-%d %H:%M')})"

