import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from common.constants.roles import UserRole

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Email is required')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('role', UserRole.SUPER_ADMIN)
        return self.create_user(email, password, **extra_fields)

class User(AbstractUser):
    username = None
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    role = models.CharField(max_length=30, choices=UserRole.choices, default=UserRole.STUDENT)
    is_email_verified = models.BooleanField(default=False)
    is_phone_verified = models.BooleanField(default=False)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    preferred_language = models.CharField(max_length=10, default='en')
    onboarding_completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    @property
    def is_student(self):
        return self.role == UserRole.STUDENT

    @property
    def is_industry(self):
        return self.role == UserRole.INDUSTRY

    @property
    def is_academician(self):
        return self.role == UserRole.ACADEMICIAN

    @property
    def is_institution_admin(self):
        return self.role == UserRole.INSTITUTION_ADMIN

    @property
    def is_super_admin(self):
        return self.role == UserRole.SUPER_ADMIN or self.is_superuser

    def __str__(self):
        return f"{self.email} ({self.role})"
