import uuid
from django.db import models
from django.conf import settings

class SkillGapAnalysis(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    student = models.ForeignKey(
        'students.StudentProfile',
        on_delete=models.CASCADE,
        related_name='skill_gaps'
    )
    target_role = models.CharField(max_length=150)
    required_skills = models.JSONField(default=list, blank=True)
    matched_skills = models.JSONField(default=list, blank=True)
    missing_skills = models.JSONField(default=list, blank=True)
    readiness_percentage = models.FloatField(default=0.0)
    recommendations = models.JSONField(default=list, blank=True)
    analyzed_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-analyzed_at']

    def __str__(self):
        return f"SkillGap: {self.student.user.email} -> {self.target_role} ({self.readiness_percentage}%)"

