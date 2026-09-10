import uuid
from django.db import models
from django.conf import settings

class MentorshipProfile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='mentorship_profile'
    )
    expertise = models.JSONField(default=list, blank=True)
    company_or_institution = models.CharField(max_length=200, blank=True, default='')
    designation = models.CharField(max_length=150, blank=True, default='Industry Mentor')
    bio = models.TextField(blank=True, default='')
    is_available = models.BooleanField(default=True)
    total_sessions_completed = models.PositiveIntegerField(default=0)
    rating = models.FloatField(default=4.9)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-rating']

    def __str__(self):
        return f"Mentor: {self.user.get_full_name() or self.user.email}"

class MentorshipSession(models.Model):
    STATUS_CHOICES = [
        ('REQUESTED', 'Requested'),
        ('SCHEDULED', 'Scheduled'),
        ('COMPLETED', 'Completed'),
        ('CANCELLED', 'Cancelled'),
    ]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    mentor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='mentor_sessions'
    )
    mentee = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='mentee_sessions'
    )
    topic = models.CharField(max_length=255)
    scheduled_at = models.DateTimeField()
    meeting_link = models.URLField(blank=True, default='')
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='REQUESTED')
    feedback_notes = models.TextField(blank=True, default='')
    rating = models.PositiveIntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-scheduled_at']

    def save(self, *args, **kwargs):
        if not self.meeting_link:
            room_hash = str(self.id or uuid.uuid4())[:8]
            self.meeting_link = f"https://meet.jit.si/portal-mentorship-{room_hash}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Session: {self.topic} ({self.mentor.email} & {self.mentee.email})"

