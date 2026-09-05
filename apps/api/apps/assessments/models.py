import uuid
from django.db import models
from django.conf import settings

class AssessmentType(models.TextChoices):
    TECHNICAL = 'TECHNICAL', 'Technical'
    APTITUDE = 'APTITUDE', 'Aptitude'
    SOFT_SKILLS = 'SOFT_SKILLS', 'Soft Skills'
    DOMAIN_SPECIFIC = 'DOMAIN_SPECIFIC', 'Domain Specific'

class AssessmentStatus(models.TextChoices):
    DRAFT = 'DRAFT', 'Draft'
    PUBLISHED = 'PUBLISHED', 'Published'
    ARCHIVED = 'ARCHIVED', 'Archived'

class AttemptStatus(models.TextChoices):
    IN_PROGRESS = 'IN_PROGRESS', 'In Progress'
    COMPLETED = 'COMPLETED', 'Completed'
    EVALUATED = 'EVALUATED', 'Evaluated'
    ABANDONED = 'ABANDONED', 'Abandoned'

class Assessment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, default='')
    assessment_type = models.CharField(
        max_length=30,
        choices=AssessmentType.choices,
        default=AssessmentType.TECHNICAL
    )
    duration_minutes = models.PositiveIntegerField(default=30)
    total_marks = models.PositiveIntegerField(default=100)
    passing_score = models.PositiveIntegerField(default=60)
    status = models.CharField(
        max_length=30,
        choices=AssessmentStatus.choices,
        default=AssessmentStatus.PUBLISHED
    )
    skills_assessed = models.ManyToManyField('skills.Skill', blank=True, related_name='assessments')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} ({self.assessment_type})"

class AssessmentQuestion(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    assessment = models.ForeignKey(Assessment, on_delete=models.CASCADE, related_name='questions')
    question_text = models.TextField()
    question_type = models.CharField(max_length=30, default='MCQ')
    options = models.JSONField(default=list, blank=True)
    correct_answer = models.CharField(max_length=255)
    points = models.PositiveIntegerField(default=10)
    explanation = models.TextField(blank=True, default='')
    order = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"Q: {self.question_text[:50]}..."

class AssessmentAttempt(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    assessment = models.ForeignKey(Assessment, on_delete=models.CASCADE, related_name='attempts')
    student = models.ForeignKey('students.StudentProfile', on_delete=models.CASCADE, related_name='assessment_attempts')
    status = models.CharField(max_length=30, choices=AttemptStatus.choices, default=AttemptStatus.IN_PROGRESS)
    score = models.FloatField(default=0.0)
    percentage = models.FloatField(default=0.0)
    passed = models.BooleanField(default=False)
    skill_breakdown = models.JSONField(default=dict, blank=True)
    submitted_answers = models.JSONField(default=dict, blank=True)
    started_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ['-started_at']

    def __str__(self):
        return f"Attempt: {self.student.user.email} - {self.assessment.title} ({self.percentage}%)"

