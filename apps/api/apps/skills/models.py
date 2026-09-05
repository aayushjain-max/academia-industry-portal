import uuid
from django.db import models
from django.utils.text import slugify

class SkillCategory(models.TextChoices):
    PROGRAMMING = 'PROGRAMMING', 'Programming Languages'
    FRAMEWORKS = 'FRAMEWORKS', 'Frameworks & Libraries'
    DATABASES = 'DATABASES', 'Databases & Storage'
    CLOUD_DEVOPS = 'CLOUD_DEVOPS', 'Cloud & DevOps'
    AI_ML = 'AI_ML', 'Artificial Intelligence & ML'
    SOFT_SKILLS = 'SOFT_SKILLS', 'Soft Skills & Leadership'
    DOMAIN_KNOWLEDGE = 'DOMAIN_KNOWLEDGE', 'Domain Knowledge'
    OTHER = 'OTHER', 'Other'

class SkillProficiency(models.TextChoices):
    BEGINNER = 'BEGINNER', 'Beginner'
    INTERMEDIATE = 'INTERMEDIATE', 'Intermediate'
    ADVANCED = 'ADVANCED', 'Advanced'
    EXPERT = 'EXPERT', 'Expert'

class Skill(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=150, unique=True)
    slug = models.SlugField(max_length=180, unique=True, blank=True)
    category = models.CharField(max_length=50, choices=SkillCategory.choices, default=SkillCategory.OTHER)
    description = models.TextField(blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} ({self.get_category_display()})"

class StudentSkill(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    student = models.ForeignKey('students.StudentProfile', on_delete=models.CASCADE, related_name='skills')
    skill = models.ForeignKey(Skill, on_delete=models.CASCADE, related_name='student_skills')
    proficiency = models.CharField(max_length=30, choices=SkillProficiency.choices, default=SkillProficiency.INTERMEDIATE)
    is_verified = models.BooleanField(default=False)
    verified_score = models.FloatField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('student', 'skill')
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.student.user.email} - {self.skill.name} ({self.proficiency})"

