import uuid
from django.db import models
from django.conf import settings

class CareerPath(models.Model):
    """
    Standardized industry career pathways (e.g., Full Stack Engineer, AI/ML Specialist).
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=200)
    description = models.TextField()
    industry = models.CharField(max_length=150, default='Technology & Software')
    salary_range = models.JSONField(default=dict, blank=True)  # {"min": 600000, "max": 1800000, "currency": "INR"}
    growth_projection = models.CharField(max_length=100, default='High (+22% YoY)')
    core_skills = models.JSONField(default=list, blank=True)
    recommended_steps = models.JSONField(default=list, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['title']

    def __str__(self):
        return f"{self.title} ({self.industry})"


class CareerReadinessScore(models.Model):
    """
    Composite Industry Readiness Index (IRI) calculation snapshot.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    student = models.OneToOneField(
        'students.StudentProfile',
        on_delete=models.CASCADE,
        related_name='readiness_score'
    )
    overall_score = models.PositiveIntegerField(default=75)
    technical_score = models.PositiveIntegerField(default=80)
    soft_skill_score = models.PositiveIntegerField(default=70)
    project_score = models.PositiveIntegerField(default=75)
    certification_score = models.PositiveIntegerField(default=70)
    experience_score = models.PositiveIntegerField(default=65)
    explanation = models.TextField(blank=True, default='')
    calculated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-calculated_at']

    def __str__(self):
        return f"Readiness: {self.student.user.email} ({self.overall_score}%)"


class ActionPlan(models.Model):
    """
    Synthesized step-by-step milestone action plan to close identified skill gaps.
    """
    PRIORITY_CHOICES = [
        ('HIGH', 'High'),
        ('MEDIUM', 'Medium'),
        ('LOW', 'Low'),
    ]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    student = models.ForeignKey(
        'students.StudentProfile',
        on_delete=models.CASCADE,
        related_name='action_plans'
    )
    target_role = models.CharField(max_length=150, default='Full Stack Developer')
    skill_gap = models.CharField(max_length=255, blank=True, default='')
    priority = models.CharField(max_length=20, choices=PRIORITY_CHOICES, default='HIGH')
    steps = models.JSONField(default=list, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-updated_at']

    def __str__(self):
        return f"ActionPlan: {self.student.user.email} -> {self.target_role}"
