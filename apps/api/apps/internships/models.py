import uuid
from django.db import models
from django.conf import settings

class InternshipPosting(models.Model):
    INTERNSHIP_TYPES = [
        ('SUMMER', 'Summer Internship'),
        ('WINTER', 'Winter Internship'),
        ('SEMESTER_LONG', 'Semester Long (6 Months)'),
        ('FACULTY_INTERNSHIP', 'Faculty Industrial Internship'),
    ]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    opportunity = models.OneToOneField(
        'opportunities.Opportunity',
        on_delete=models.CASCADE,
        related_name='internship_details'
    )
    internship_type = models.CharField(max_length=30, choices=INTERNSHIP_TYPES, default='SUMMER')
    weekly_hours = models.PositiveIntegerField(default=40)
    mentorship_provided = models.BooleanField(default=True)
    certificate_provided = models.BooleanField(default=True)
    ppo_eligible = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Internship: {self.opportunity.title} ({self.internship_type})"

