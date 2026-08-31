from django.db import models

class UserRole(models.TextChoices):
    STUDENT = 'STUDENT', 'Student'
    INDUSTRY = 'INDUSTRY', 'Industry Representative'
    ACADEMICIAN = 'ACADEMICIAN', 'Academician / Faculty'
    INSTITUTION_ADMIN = 'INSTITUTION_ADMIN', 'Institution Administrator'
    SUPER_ADMIN = 'SUPER_ADMIN', 'Super Administrator'
