import uuid
from django.db import models
from django.conf import settings


class AcademicianProfile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='academician_profile'
    )
    institution_name = models.CharField(max_length=255, blank=True, default='')
    department = models.CharField(max_length=150, blank=True, default='')
    designation = models.CharField(max_length=100, blank=True, default='Assistant Professor')
    qualifications = models.CharField(max_length=255, blank=True, default='Ph.D.')
    experience_years = models.PositiveIntegerField(default=5)
    areas_of_expertise = models.TextField(blank=True, default='')
    research_interests = models.TextField(blank=True, default='')
    industry_training_interests = models.TextField(blank=True, default='')
    consultancy_areas = models.TextField(blank=True, default='')
    bio = models.TextField(blank=True, default='')
    orcid = models.CharField(max_length=50, blank=True, default='')
    google_scholar = models.URLField(blank=True, default='')
    linkedin_url = models.URLField(blank=True, default='')
    website = models.URLField(blank=True, default='')
    avatar_url = models.URLField(blank=True, default='')
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Academician: {self.user.email} ({self.designation}, {self.department})"


class Publication(models.Model):
    PUBLICATION_TYPES = [
        ('JOURNAL', 'Journal Article'),
        ('CONFERENCE', 'Conference Paper'),
        ('BOOK_CHAPTER', 'Book Chapter'),
        ('PATENT', 'Patent Publication'),
        ('PREPRINT', 'Preprint'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    academician = models.ForeignKey(
        AcademicianProfile,
        on_delete=models.CASCADE,
        related_name='publications'
    )
    title = models.CharField(max_length=500)
    authors = models.CharField(max_length=500, blank=True, default='')
    journal = models.CharField(max_length=255, blank=True, default='')
    conference = models.CharField(max_length=255, blank=True, default='')
    publication_type = models.CharField(max_length=30, choices=PUBLICATION_TYPES, default='JOURNAL')
    publication_date = models.DateField(null=True, blank=True)
    doi = models.CharField(max_length=150, blank=True, default='')
    url = models.URLField(blank=True, default='')
    abstract = models.TextField(blank=True, default='')
    indexing = models.CharField(max_length=100, default='SCOPUS')
    citation_count = models.PositiveIntegerField(default=0)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-publication_date', '-created_at']

    def __str__(self):
        return f"Publication: {self.title[:60]} ({self.doi or self.journal})"


class Patent(models.Model):
    PATENT_STATUS_CHOICES = [
        ('FILED', 'Filed'),
        ('PUBLISHED', 'Published'),
        ('GRANTED', 'Granted'),
        ('LICENSED', 'Licensed'),
        ('ABANDONED', 'Abandoned'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    academician = models.ForeignKey(
        AcademicianProfile,
        on_delete=models.CASCADE,
        related_name='patents'
    )
    title = models.CharField(max_length=500)
    patent_number = models.CharField(max_length=100, blank=True, default='')
    filing_date = models.DateField(null=True, blank=True)
    grant_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=30, choices=PATENT_STATUS_CHOICES, default='FILED')
    inventors = models.CharField(max_length=500, blank=True, default='')
    jurisdiction = models.CharField(max_length=100, default='India (IPO)')
    description = models.TextField(blank=True, default='')
    document_url = models.URLField(blank=True, default='')
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-filing_date', '-created_at']

    def __str__(self):
        return f"Patent: {self.title[:60]} ({self.patent_number or self.status})"


class ResearchProject(models.Model):
    STATUS_CHOICES = [
        ('PLANNED', 'Planned'),
        ('ACTIVE', 'Active'),
        ('ON_HOLD', 'On Hold'),
        ('COMPLETED', 'Completed'),
        ('CANCELLED', 'Cancelled'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    academician = models.ForeignKey(
        AcademicianProfile,
        on_delete=models.CASCADE,
        related_name='research_projects'
    )
    title = models.CharField(max_length=500)
    description = models.TextField(blank=True, default='')
    research_area = models.CharField(max_length=200, blank=True, default='')
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='ACTIVE')
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    funding_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0.0)
    funding_agency = models.CharField(max_length=200, blank=True, default='')
    industry_partner = models.CharField(max_length=200, blank=True, default='')
    objectives = models.JSONField(default=list, blank=True)
    progress_percentage = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Research: {self.title[:60]} ({self.status})"


class ResearchMember(models.Model):
    ROLE_CHOICES = [
        ('PI', 'Principal Investigator'),
        ('CO_PI', 'Co-Principal Investigator'),
        ('INDUSTRY_LEAD', 'Industry Partner Lead'),
        ('JRF', 'Junior Research Fellow'),
        ('SRF', 'Senior Research Fellow'),
        ('POSTDOC', 'Postdoctoral Fellow'),
        ('STUDENT_RESEARCHER', 'Student Researcher'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    project = models.ForeignKey(
        ResearchProject,
        on_delete=models.CASCADE,
        related_name='members'
    )
    name = models.CharField(max_length=200)
    role = models.CharField(max_length=30, choices=ROLE_CHOICES, default='CO_PI')
    email = models.EmailField(blank=True, default='')
    affiliation = models.CharField(max_length=255, blank=True, default='')
    joined_at = models.DateField(null=True, blank=True)

    class Meta:
        ordering = ['role', 'name']

    def __str__(self):
        return f"{self.name} ({self.role}) - {self.project.title[:30]}"


class ResearchMilestone(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('IN_PROGRESS', 'In Progress'),
        ('COMPLETED', 'Completed'),
        ('DELAYED', 'Delayed'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    project = models.ForeignKey(
        ResearchProject,
        on_delete=models.CASCADE,
        related_name='milestones'
    )
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, default='')
    due_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='PENDING')
    progress_percentage = models.PositiveIntegerField(default=0)
    completion_date = models.DateField(null=True, blank=True)

    class Meta:
        ordering = ['due_date', 'title']

    def __str__(self):
        return f"Milestone: {self.title} ({self.status})"


class GrantOpportunity(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=500)
    funding_agency = models.CharField(max_length=255)
    grant_code = models.CharField(max_length=100, blank=True, default='')
    category = models.CharField(max_length=100, default='General R&D')
    description = models.TextField(blank=True, default='')
    total_funding = models.DecimalField(max_digits=12, decimal_places=2, default=0.0)
    duration_months = models.PositiveIntegerField(default=24)
    deadline = models.DateField(null=True, blank=True)
    eligibility_criteria = models.TextField(blank=True, default='')
    guidelines_url = models.URLField(blank=True, default='')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['deadline', '-created_at']

    def __str__(self):
        return f"Grant: {self.title[:50]} ({self.funding_agency})"


class GrantApplication(models.Model):
    STATUS_CHOICES = [
        ('DRAFT', 'Draft'),
        ('SUBMITTED', 'Submitted'),
        ('UNDER_REVIEW', 'Under Review'),
        ('APPROVED', 'Approved'),
        ('REJECTED', 'Rejected'),
        ('DISBURSED', 'Disbursed'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    academician = models.ForeignKey(
        AcademicianProfile,
        on_delete=models.CASCADE,
        related_name='grant_applications'
    )
    grant_opportunity = models.ForeignKey(
        GrantOpportunity,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='applications'
    )
    project_title = models.CharField(max_length=500)
    executive_summary = models.TextField(blank=True, default='')
    requested_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0.0)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='DRAFT')
    submitted_at = models.DateTimeField(null=True, blank=True)
    approved_at = models.DateTimeField(null=True, blank=True)
    review_notes = models.TextField(blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"GrantApp: {self.project_title[:50]} ({self.status})"


class IndustryCollaboration(models.Model):
    COLLABORATION_TYPES = [
        ('RESEARCH', 'Joint Research'),
        ('CONSULTANCY', 'Corporate Consultancy'),
        ('TRAINING', 'Industrial Training'),
        ('INTERNSHIP', 'Faculty Internship'),
        ('INDUSTRY_PROJECT', 'Industry Project'),
        ('CURRICULUM', 'Curriculum Advisory'),
        ('WORKSHOP', 'Joint Workshop'),
        ('FACULTY_DEVELOPMENT', 'Faculty Development'),
    ]

    STATUS_CHOICES = [
        ('PROPOSED', 'Proposed'),
        ('DISCUSSION', 'In Discussion'),
        ('APPROVED', 'Approved'),
        ('ACTIVE', 'Active'),
        ('COMPLETED', 'Completed'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    academician = models.ForeignKey(
        AcademicianProfile,
        on_delete=models.CASCADE,
        related_name='collaborations'
    )
    company_name = models.CharField(max_length=255)
    title = models.CharField(max_length=500)
    collaboration_type = models.CharField(max_length=30, choices=COLLABORATION_TYPES, default='RESEARCH')
    description = models.TextField(blank=True, default='')
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='PROPOSED')
    contract_value = models.DecimalField(max_digits=12, decimal_places=2, default=0.0)
    outcomes = models.TextField(blank=True, default='')
    document_url = models.URLField(blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Collab: {self.title[:50]} with {self.company_name} ({self.status})"


class ConsultancyProject(models.Model):
    STATUS_CHOICES = [
        ('LEAD', 'Lead / Inquiry'),
        ('PROPOSAL', 'Proposal Submitted'),
        ('NEGOTIATION', 'Under Negotiation'),
        ('CONTRACT', 'Contract Executed'),
        ('ACTIVE', 'Active Retainer'),
        ('MILESTONES_IN_REVIEW', 'Milestone in Review'),
        ('COMPLETED', 'Completed'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    academician = models.ForeignKey(
        AcademicianProfile,
        on_delete=models.CASCADE,
        related_name='consultancies'
    )
    client_company = models.CharField(max_length=255)
    project_title = models.CharField(max_length=500)
    description = models.TextField(blank=True, default='')
    contract_value = models.DecimalField(max_digits=12, decimal_places=2, default=0.0)
    institutional_share_pct = models.DecimalField(max_digits=5, decimal_places=2, default=30.0)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='LEAD')
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    deliverables = models.TextField(blank=True, default='')
    hours_allocated = models.PositiveIntegerField(default=100)
    hours_delivered = models.PositiveIntegerField(default=0)
    invoice_status = models.CharField(max_length=100, default='PENDING_MILESTONE')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Consultancy: {self.project_title[:50]} ({self.client_company})"


class FDPProgram(models.Model):
    MODE_CHOICES = [
        ('ONLINE', 'Online'),
        ('OFFLINE', 'Offline / In-Person'),
        ('HYBRID', 'Hybrid'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=500)
    organizer = models.CharField(max_length=255)
    mode = models.CharField(max_length=20, choices=MODE_CHOICES, default='ONLINE')
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    duration_days = models.PositiveIntegerField(default=5)
    category = models.CharField(max_length=100, default='Emerging Technologies')
    description = models.TextField(blank=True, default='')
    venue_or_link = models.CharField(max_length=255, blank=True, default='')
    total_seats = models.PositiveIntegerField(default=50)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['start_date', '-created_at']

    def __str__(self):
        return f"FDP: {self.title[:50]} ({self.organizer})"


class FDPRegistration(models.Model):
    STATUS_CHOICES = [
        ('REGISTERED', 'Registered'),
        ('ATTENDED', 'Attended'),
        ('COMPLETED', 'Completed & Certified'),
        ('CANCELLED', 'Cancelled'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    academician = models.ForeignKey(
        AcademicianProfile,
        on_delete=models.CASCADE,
        related_name='fdp_registrations'
    )
    program = models.ForeignKey(
        FDPProgram,
        on_delete=models.CASCADE,
        related_name='registrations'
    )
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='REGISTERED')
    certificate_url = models.URLField(blank=True, default='')
    feedback_score = models.PositiveIntegerField(null=True, blank=True)
    feedback_text = models.TextField(blank=True, default='')
    registered_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('academician', 'program')
        ordering = ['-registered_at']

    def __str__(self):
        return f"FDP Reg: {self.academician.user.email} -> {self.program.title[:30]}"


class TrainingProgram(models.Model):
    MODE_CHOICES = [
        ('ONLINE', 'Online'),
        ('OFFLINE', 'Offline / On-Site'),
        ('HYBRID', 'Hybrid'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=500)
    provider = models.CharField(max_length=255)
    industry_partner = models.CharField(max_length=255, blank=True, default='')
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    mode = models.CharField(max_length=20, choices=MODE_CHOICES, default='HYBRID')
    description = models.TextField(blank=True, default='')
    eligibility = models.CharField(max_length=255, blank=True, default='Open to Faculty')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['start_date', '-created_at']

    def __str__(self):
        return f"Training: {self.title[:50]} ({self.provider})"


class TrainingRegistration(models.Model):
    STATUS_CHOICES = [
        ('REGISTERED', 'Registered'),
        ('IN_TRAINING', 'In Training'),
        ('COMPLETED', 'Completed & Certified'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    academician = models.ForeignKey(
        AcademicianProfile,
        on_delete=models.CASCADE,
        related_name='training_registrations'
    )
    program = models.ForeignKey(
        TrainingProgram,
        on_delete=models.CASCADE,
        related_name='registrations'
    )
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='REGISTERED')
    certificate_url = models.URLField(blank=True, default='')
    registered_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('academician', 'program')
        ordering = ['-registered_at']

    def __str__(self):
        return f"Training Reg: {self.academician.user.email} -> {self.program.title[:30]}"


class Workshop(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=500)
    domain = models.CharField(max_length=150, default='Computer Science & AI')
    organizer = models.CharField(max_length=255)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    description = models.TextField(blank=True, default='')
    venue_or_link = models.CharField(max_length=255, blank=True, default='')
    capacity = models.PositiveIntegerField(default=100)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['start_date', '-created_at']

    def __str__(self):
        return f"Workshop: {self.title[:50]} ({self.organizer})"


class WorkshopRegistration(models.Model):
    STATUS_CHOICES = [
        ('REGISTERED', 'Registered'),
        ('ATTENDED', 'Attended'),
        ('COMPLETED', 'Completed & Certified'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    academician = models.ForeignKey(
        AcademicianProfile,
        on_delete=models.CASCADE,
        related_name='workshop_registrations'
    )
    workshop = models.ForeignKey(
        Workshop,
        on_delete=models.CASCADE,
        related_name='registrations'
    )
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='REGISTERED')
    certificate_url = models.URLField(blank=True, default='')
    feedback_rating = models.PositiveIntegerField(null=True, blank=True)
    registered_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('academician', 'workshop')
        ordering = ['-registered_at']

    def __str__(self):
        return f"Workshop Reg: {self.academician.user.email} -> {self.workshop.title[:30]}"
