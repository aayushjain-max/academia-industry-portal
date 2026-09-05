import uuid
from django.db import models
from django.conf import settings

class LearningItemType(models.TextChoices):
    COURSE = 'COURSE', 'Online Course'
    TRAINING = 'TRAINING', 'Industry Training'
    WORKSHOP = 'WORKSHOP', 'Interactive Workshop'
    MODULE = 'MODULE', 'Self-paced Module'

class LearningResource(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    provider = models.CharField(max_length=150, default='Internal Portal')
    type = models.CharField(
        max_length=30,
        choices=LearningItemType.choices,
        default=LearningItemType.COURSE
    )
    url = models.URLField(blank=True, default='https://learning.portal.internal')
    duration_hours = models.PositiveIntegerField(default=10)
    skills_targeted = models.ManyToManyField('skills.Skill', blank=True, related_name='learning_resources')
    difficulty = models.CharField(max_length=30, default='INTERMEDIATE')
    rating = models.FloatField(default=4.8)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-rating', 'title']

    def __str__(self):
        return f"{self.title} ({self.provider})"

class UserLearningProgress(models.Model):
    STATUS_CHOICES = [
        ('NOT_STARTED', 'Not Started'),
        ('IN_PROGRESS', 'In Progress'),
        ('COMPLETED', 'Completed'),
    ]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    student = models.ForeignKey(
        'students.StudentProfile',
        on_delete=models.CASCADE,
        related_name='learning_progress'
    )
    resource = models.ForeignKey(
        LearningResource,
        on_delete=models.CASCADE,
        related_name='progress_records'
    )
    progress_percentage = models.FloatField(default=0.0)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='NOT_STARTED')
    started_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        unique_together = ('student', 'resource')
        ordering = ['-started_at']

    def __str__(self):
        return f"{self.student.user.email} - {self.resource.title} ({self.progress_percentage}%)"

class IndustryTraining(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    industry = models.ForeignKey(
        'industries.IndustryProfile',
        on_delete=models.CASCADE,
        related_name='trainings'
    )
    title = models.CharField(max_length=255)
    description = models.TextField()
    syllabus = models.JSONField(default=list, blank=True)
    duration_weeks = models.PositiveIntegerField(default=4)
    mode = models.CharField(max_length=30, default='ONLINE')
    schedule = models.CharField(max_length=150, default='Weekend Batches')
    max_participants = models.PositiveIntegerField(default=50)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} by {self.industry.company_name}"

