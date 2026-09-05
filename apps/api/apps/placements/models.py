import uuid
from django.db import models
from django.conf import settings

class PlacementDrive(models.Model):
    STATUS_CHOICES = [
        ('UPCOMING', 'Upcoming Drive'),
        ('ONGOING', 'Ongoing Drive'),
        ('COMPLETED', 'Completed'),
    ]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    company = models.ForeignKey(
        'industries.IndustryProfile',
        on_delete=models.CASCADE,
        related_name='placement_drives'
    )
    title = models.CharField(max_length=255)
    eligible_branches = models.JSONField(default=list, blank=True)
    minimum_cgpa = models.DecimalField(max_digits=4, decimal_places=2, default=6.5)
    package_lpa = models.DecimalField(max_digits=5, decimal_places=2, default=12.0)
    drive_date = models.DateField()
    rounds = models.JSONField(default=list, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='UPCOMING')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['drive_date']

    def __str__(self):
        return f"{self.title} - {self.company.company_name} ({self.package_lpa} LPA)"

class PlacementRecord(models.Model):
    STATUS_CHOICES = [
        ('OFFERED', 'Offer Extended'),
        ('ACCEPTED', 'Offer Accepted'),
        ('DECLINED', 'Offer Declined'),
    ]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    student = models.ForeignKey(
        'students.StudentProfile',
        on_delete=models.CASCADE,
        related_name='placement_records'
    )
    drive = models.ForeignKey(
        PlacementDrive,
        on_delete=models.CASCADE,
        related_name='placed_students'
    )
    package_offered_lpa = models.DecimalField(max_digits=5, decimal_places=2, default=12.0)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='OFFERED')
    offer_letter_url = models.URLField(blank=True, default='')
    offered_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-offered_at']

    def __str__(self):
        return f"{self.student.user.email} -> {self.drive.company.company_name} ({self.package_offered_lpa} LPA)"

