import uuid
from django.db import models
from django.conf import settings

class SkillProfile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    student = models.OneToOneField(
        'students.StudentProfile',
        on_delete=models.CASCADE,
        related_name='skill_profile'
    )
    overall_score = models.FloatField(default=0.0)
    technical_score = models.FloatField(default=0.0)
    soft_skill_score = models.FloatField(default=0.0)
    domain_score = models.FloatField(default=0.0)
    strengths = models.JSONField(default=list, blank=True)
    weaknesses = models.JSONField(default=list, blank=True)
    domain_breakdown = models.JSONField(default=dict, blank=True)
    profile_summary = models.TextField(blank=True, default='')
    verified_skills_count = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-updated_at']

    def __str__(self):
        return f"SkillProfile: {self.student.user.email} (Score: {self.overall_score})"

