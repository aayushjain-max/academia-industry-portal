import uuid
from django.db import models
from django.conf import settings

class MicroInternship(models.Model):
    STATUS_CHOICES = [
        ('OPEN', 'Open for Applications'),
        ('IN_PROGRESS', 'In Progress'),
        ('COMPLETED', 'Completed'),
        ('CLOSED', 'Closed'),
    ]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    industry = models.ForeignKey(
        'industries.IndustryProfile',
        on_delete=models.CASCADE,
        related_name='micro_internships'
    )
    title = models.CharField(max_length=255)
    problem_statement = models.TextField()
    deliverables = models.JSONField(default=list, blank=True)
    stipend = models.CharField(max_length=100, default='INR 15,000')
    duration_days = models.PositiveIntegerField(default=21)
    required_skills = models.ManyToManyField('skills.Skill', blank=True, related_name='micro_internships')
    max_applicants = models.PositiveIntegerField(default=5)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='OPEN')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Micro-Internship: {self.title} @ {self.industry.company_name}"

