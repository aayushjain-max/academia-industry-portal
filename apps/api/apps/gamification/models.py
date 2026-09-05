import uuid
from django.db import models
from django.conf import settings

class BadgeCategory(models.TextChoices):
    ASSESSMENT = 'ASSESSMENT', 'Assessment Mastery'
    PROJECT = 'PROJECT', 'Project Excellence'
    MENTORSHIP = 'MENTORSHIP', 'Mentorship & Collab'
    COMMUNITY = 'COMMUNITY', 'Community Engagement'
    SPECIAL = 'SPECIAL', 'Special Achievement'

class Badge(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=150, unique=True)
    slug = models.SlugField(max_length=150, unique=True)
    icon = models.CharField(max_length=50, default='award')
    description = models.TextField(blank=True, default='')
    points_reward = models.PositiveIntegerField(default=100)
    category = models.CharField(max_length=30, choices=BadgeCategory.choices, default=BadgeCategory.ASSESSMENT)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} (+{self.points_reward} pts)"

class UserGamification(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='gamification'
    )
    total_points = models.PositiveIntegerField(default=150)
    current_level = models.PositiveIntegerField(default=1)
    rank = models.PositiveIntegerField(default=1)
    streak_days = models.PositiveIntegerField(default=3)
    badges = models.ManyToManyField(Badge, blank=True, related_name='earned_by')
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-total_points']

    def calculate_level(self):
        # Every 500 points = 1 level
        return max(1, (self.total_points // 500) + 1)

    def save(self, *args, **kwargs):
        self.current_level = self.calculate_level()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.user.email} - Level {self.current_level} ({self.total_points} pts)"

