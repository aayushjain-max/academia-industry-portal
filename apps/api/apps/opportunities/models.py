import uuid
from django.db import models

class OpportunityType(models.TextChoices):
    INTERNSHIP = 'INTERNSHIP', 'Internship'
    JOB = 'JOB', 'Full-time Job'
    MICRO_INTERNSHIP = 'MICRO_INTERNSHIP', 'Micro-Internship'
    PROJECT = 'PROJECT', 'Industry-Academia Project'

class OpportunityStatus(models.TextChoices):
    DRAFT = 'DRAFT', 'Draft'
    ACTIVE = 'ACTIVE', 'Active / Accepting Applications'
    CLOSED = 'CLOSED', 'Closed'

class Opportunity(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    industry = models.ForeignKey('industries.IndustryProfile', on_delete=models.CASCADE, related_name='opportunities')
    title = models.CharField(max_length=255)
    opportunity_type = models.CharField(max_length=30, choices=OpportunityType.choices, default=OpportunityType.INTERNSHIP)
    description = models.TextField()
    location = models.CharField(max_length=255, default='Remote')
    is_remote = models.BooleanField(default=True)
    stipend_or_salary = models.CharField(max_length=100, blank=True, default='Competitive')
    required_skills = models.ManyToManyField('skills.Skill', blank=True, related_name='opportunities')
    application_deadline = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=OpportunityStatus.choices, default=OpportunityStatus.ACTIVE)
    openings_count = models.PositiveIntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} @ {self.industry.company_name} ({self.opportunity_type})"

