import uuid
from django.db import models
from django.conf import settings

class AssessmentType(models.TextChoices):
    TECHNICAL = 'technical', 'Technical'
    APTITUDE = 'aptitude', 'Aptitude & Logic'
    SOFT_SKILLS = 'soft', 'Soft Skills'
    DOMAIN_SPECIFIC = 'domain_specific', 'Domain Specific'

class AssessmentStatus(models.TextChoices):
    DRAFT = 'draft', 'Draft'
    PUBLISHED = 'published', 'Published'
    ARCHIVED = 'archived', 'Archived'

class AttemptStatus(models.TextChoices):
    IN_PROGRESS = 'in_progress', 'In Progress'
    COMPLETED = 'completed', 'Completed'
    EVALUATED = 'evaluated', 'Evaluated'
    PASSED = 'passed', 'Passed'
    FAILED = 'failed', 'Failed'

class Assessment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=150, unique=True, null=True, blank=True)
    description = models.TextField(blank=True, default='')
    category = models.CharField(
        max_length=30,
        choices=AssessmentType.choices,
        default=AssessmentType.TECHNICAL
    )
    duration_minutes = models.PositiveIntegerField(default=15)
    total_questions = models.PositiveIntegerField(default=10)
    passing_score = models.PositiveIntegerField(default=70) # percentage
    status = models.CharField(
        max_length=30,
        choices=AssessmentStatus.choices,
        default=AssessmentStatus.PUBLISHED
    )
    skill_tags = models.JSONField(default=list, blank=True) # ['TypeScript', 'Next.js']
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} ({self.category})"


class AssessmentQuestion(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    assessment = models.ForeignKey(Assessment, on_delete=models.CASCADE, related_name='questions')
    question_text = models.TextField()
    options = models.JSONField(default=list, blank=True) # ['Option A', 'Option B', 'Option C', 'Option D']
    correct_option = models.PositiveIntegerField(default=0) # 0-indexed
    category = models.CharField(max_length=30, choices=AssessmentType.choices, default=AssessmentType.TECHNICAL)
    skill_tag = models.CharField(max_length=100, default='General')
    difficulty = models.CharField(max_length=20, default='intermediate')
    points = models.PositiveIntegerField(default=10)
    explanation = models.TextField(blank=True, default='')
    order = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"Q [{self.skill_tag}]: {self.question_text[:50]}..."


class AssessmentAttempt(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    assessment = models.ForeignKey(Assessment, on_delete=models.CASCADE, related_name='attempts')
    student = models.ForeignKey('students.StudentProfile', on_delete=models.CASCADE, related_name='assessment_attempts')
    status = models.CharField(max_length=30, choices=AttemptStatus.choices, default=AttemptStatus.IN_PROGRESS)
    score_percentage = models.FloatField(default=0.0) # 0 - 100%
    score_raw = models.FloatField(default=0.0) # 0.0 - 10.0 scale
    total_questions = models.PositiveIntegerField(default=10)
    correct_count = models.PositiveIntegerField(default=0)
    time_spent_seconds = models.PositiveIntegerField(default=0)
    topic_breakdown = models.JSONField(default=list, blank=True) # [{'skill_tag': 'TypeScript', 'correct': 5, 'total': 5, 'score': 10.0}]
    submitted_answers = models.JSONField(default=dict, blank=True) # {0: 1, 1: 2}
    started_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ['-started_at']

    def __str__(self):
        return f"Attempt: {self.student.user.email} - {self.assessment.title} ({self.score_percentage}%)"
