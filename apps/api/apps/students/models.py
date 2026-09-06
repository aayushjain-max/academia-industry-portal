import uuid
from django.db import models
from django.conf import settings

class StudentType(models.TextChoices):
    COLLEGE = 'college', 'College Student'
    ALUMNI = 'alumni', 'Alumni'
    PRE_COLLEGE = 'pre_college', 'Pre-College (High School)'

class GuardianConsentStatus(models.TextChoices):
    NOT_REQUIRED = 'not_required', 'Not Required'
    PENDING = 'pending', 'Pending Confirmation'
    CONFIRMED = 'confirmed', 'Confirmed & Locked'

class StudentProfile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='student_profile')
    student_type = models.CharField(
        max_length=30,
        choices=StudentType.choices,
        default=StudentType.COLLEGE
    )
    institution_name = models.CharField(max_length=255, blank=True, default='')
    roll_number = models.CharField(max_length=100, blank=True, default='')
    degree = models.CharField(max_length=150, blank=True, default='')
    department = models.CharField(max_length=150, blank=True, default='')
    year_of_study = models.PositiveIntegerField(null=True, blank=True, default=1)
    cgpa = models.DecimalField(max_digits=4, decimal_places=2, null=True, blank=True)
    headline = models.CharField(max_length=255, blank=True, default='')
    bio = models.TextField(blank=True, default='')
    
    # Portfolio & Public Showcase
    portfolio_slug = models.SlugField(max_length=100, unique=True, null=True, blank=True, db_index=True)
    passport_hash = models.CharField(max_length=66, blank=True, default='')
    resume_url = models.URLField(blank=True, default='')
    github_url = models.URLField(blank=True, default='')
    linkedin_url = models.URLField(blank=True, default='')
    portfolio_url = models.URLField(blank=True, default='')

    # Guardian Consent Compliance (Pre-College)
    guardian_consent_status = models.CharField(
        max_length=30,
        choices=GuardianConsentStatus.choices,
        default=GuardianConsentStatus.NOT_REQUIRED
    )
    guardian_name = models.CharField(max_length=255, blank=True, default='')
    guardian_email = models.EmailField(blank=True, default='')
    guardian_token = models.CharField(max_length=128, blank=True, default='', db_index=True)
    guardian_confirmed_at = models.DateTimeField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"StudentProfile: {self.user.email} ({self.degree})"


class StudentChatSession(models.Model):
    """
    AI Career Advisor Session with rolling context window and daily token quota.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    student = models.OneToOneField(
        StudentProfile,
        on_delete=models.CASCADE,
        related_name='chat_session'
    )
    messages = models.JSONField(default=list, blank=True) # [{'id', 'role', 'content', 'timestamp'}]
    daily_count = models.PositiveIntegerField(default=0)
    daily_limit = models.PositiveIntegerField(default=30)
    last_reset_at = models.DateTimeField(auto_now_add=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-updated_at']

    def __str__(self):
        return f"ChatSession: {self.student.user.email} ({self.daily_count}/{self.daily_limit})"
