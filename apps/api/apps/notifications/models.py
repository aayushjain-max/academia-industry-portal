import uuid
from django.db import models
from django.conf import settings

class Notification(models.Model):
    CHANNELS = [
        ('IN_APP', 'In-App'),
        ('EMAIL', 'Email'),
        ('SMS', 'SMS'),
        ('WHATSAPP', 'WhatsApp'),
        ('PUSH', 'Push'),
    ]
    TYPES = [
        ('APPLICATION_UPDATE', 'Application Update'),
        ('NEW_OPPORTUNITY', 'New Opportunity'),
        ('ASSESSMENT_RESULT', 'Assessment Result'),
        ('MENTORSHIP_INVITE', 'Mentorship Invite'),
        ('SYSTEM_ALERT', 'System Alert'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='notifications')
    title = models.CharField(max_length=255)
    message = models.TextField()
    channel = models.CharField(max_length=20, choices=CHANNELS, default='IN_APP')
    type = models.CharField(max_length=30, choices=TYPES, default='SYSTEM_ALERT')
    is_read = models.BooleanField(default=False)
    link_url = models.CharField(max_length=500, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.email} - {self.title} ({self.type})"
