import uuid
from django.db import models

class ApplicationStatus(models.TextChoices):
    APPLIED = 'APPLIED', 'Applied'
    UNDER_REVIEW = 'UNDER_REVIEW', 'Under Review'
    SHORTLISTED = 'SHORTLISTED', 'Shortlisted'
    ACCEPTED = 'ACCEPTED', 'Accepted'
    REJECTED = 'REJECTED', 'Rejected'

class Application(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    student = models.ForeignKey('students.StudentProfile', on_delete=models.CASCADE, related_name='applications')
    opportunity = models.ForeignKey('opportunities.Opportunity', on_delete=models.CASCADE, related_name='applications')
    status = models.CharField(max_length=30, choices=ApplicationStatus.choices, default=ApplicationStatus.APPLIED)
    cover_letter = models.TextField(blank=True, default='')
    resume_url = models.URLField(blank=True, default='')
    feedback = models.TextField(blank=True, default='')
    applied_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('student', 'opportunity')
        ordering = ['-applied_at']

    def __str__(self):
        return f"{self.student.user.email} -> {self.opportunity.title} ({self.status})"

