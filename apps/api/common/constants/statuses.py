from django.db import models

class ApplicationStatus(models.TextChoices):
    APPLIED = 'APPLIED', 'Applied'
    UNDER_REVIEW = 'UNDER_REVIEW', 'Under Review'
    SHORTLISTED = 'SHORTLISTED', 'Shortlisted'
    ASSESSMENT = 'ASSESSMENT', 'Assessment Scheduled'
    INTERVIEW = 'INTERVIEW', 'Interview Scheduled'
    SELECTED = 'SELECTED', 'Selected / Offered'
    REJECTED = 'REJECTED', 'Rejected'
    WITHDRAWN = 'WITHDRAWN', 'Withdrawn'
    JOINED = 'JOINED', 'Joined'
    COMPLETED = 'COMPLETED', 'Completed'
