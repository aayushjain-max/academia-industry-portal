from django.db import transaction
from django.core.exceptions import ValidationError
from django.utils import timezone
from .models import (
    AcademicianProfile,
    Publication,
    Patent,
    ResearchProject,
    ResearchMember,
    ResearchMilestone,
    GrantOpportunity,
    GrantApplication,
    IndustryCollaboration,
    ConsultancyProject,
    FDPProgram,
    FDPRegistration,
    TrainingProgram,
    TrainingRegistration,
    Workshop,
    WorkshopRegistration,
)
from apps.notifications.models import Notification


@transaction.atomic
def update_academician_profile(academician: AcademicianProfile, data: dict) -> AcademicianProfile:
    """
    Safely updates personal/professional profile fields for an academician.
    """
    for field, val in data.items():
        if hasattr(academician, field) and field not in ['id', 'user', 'created_at', 'updated_at']:
            setattr(academician, field, val)
    academician.save()
    return academician


@transaction.atomic
def create_publication(academician: AcademicianProfile, data: dict) -> Publication:
    """
    Creates a new peer-reviewed publication record.
    """
    title = data.get('title')
    if not title:
        raise ValidationError({"title": "Publication title is required."})

    pub = Publication.objects.create(
        academician=academician,
        title=title,
        authors=data.get('authors', ''),
        journal=data.get('journal', ''),
        conference=data.get('conference', ''),
        publication_type=data.get('publication_type', 'JOURNAL'),
        publication_date=data.get('publication_date', None),
        doi=data.get('doi', ''),
        url=data.get('url', ''),
        abstract=data.get('abstract', ''),
        indexing=data.get('indexing', 'SCOPUS'),
        citation_count=data.get('citation_count', 0),
        is_verified=data.get('is_verified', False),
    )
    return pub


@transaction.atomic
def create_patent(academician: AcademicianProfile, data: dict) -> Patent:
    """
    Registers an intellectual property / patent filing.
    """
    title = data.get('title')
    if not title:
        raise ValidationError({"title": "Patent title is required."})

    patent = Patent.objects.create(
        academician=academician,
        title=title,
        patent_number=data.get('patent_number', ''),
        filing_date=data.get('filing_date', None),
        grant_date=data.get('grant_date', None),
        status=data.get('status', 'FILED'),
        inventors=data.get('inventors', ''),
        jurisdiction=data.get('jurisdiction', 'India (IPO)'),
        description=data.get('description', ''),
        document_url=data.get('document_url', ''),
        is_verified=data.get('is_verified', False),
    )
    return patent


@transaction.atomic
def create_research_project(
    academician: AcademicianProfile,
    data: dict,
    milestones: list = None,
    members: list = None
) -> ResearchProject:
    """
    Creates a full research project with optional initial milestones and research team members.
    """
    title = data.get('title')
    if not title:
        raise ValidationError({"title": "Research project title is required."})

    project = ResearchProject.objects.create(
        academician=academician,
        title=title,
        description=data.get('description', ''),
        research_area=data.get('research_area', ''),
        status=data.get('status', 'ACTIVE'),
        start_date=data.get('start_date', None),
        end_date=data.get('end_date', None),
        funding_amount=data.get('funding_amount', 0.0),
        funding_agency=data.get('funding_agency', ''),
        industry_partner=data.get('industry_partner', ''),
        objectives=data.get('objectives', []),
        progress_percentage=data.get('progress_percentage', 0),
    )

    # Automatically add the PI
    ResearchMember.objects.create(
        project=project,
        name=f"{academician.user.first_name} {academician.user.last_name}".strip() or academician.user.email,
        role='PI',
        email=academician.user.email,
        affiliation=academician.institution_name,
        joined_at=timezone.now().date()
    )

    if milestones:
        for ms in milestones:
            if isinstance(ms, dict) and ms.get('title'):
                ResearchMilestone.objects.create(
                    project=project,
                    title=ms.get('title'),
                    description=ms.get('description', ''),
                    due_date=ms.get('due_date', None),
                    status=ms.get('status', 'PENDING'),
                    progress_percentage=ms.get('progress_percentage', 0),
                )

    if members:
        for m in members:
            if isinstance(m, dict) and m.get('name'):
                ResearchMember.objects.create(
                    project=project,
                    name=m.get('name'),
                    role=m.get('role', 'CO_PI'),
                    email=m.get('email', ''),
                    affiliation=m.get('affiliation', ''),
                    joined_at=m.get('joined_at', timezone.now().date()),
                )

    return project


@transaction.atomic
def submit_grant_application(academician: AcademicianProfile, data: dict) -> GrantApplication:
    """
    Submits a grant application proposal.
    """
    project_title = data.get('project_title')
    if not project_title:
        raise ValidationError({"project_title": "Project title is required."})

    grant_opp_id = data.get('grant_opportunity_id')
    grant_opp = None
    if grant_opp_id:
        try:
            grant_opp = GrantOpportunity.objects.get(id=grant_opp_id)
        except GrantOpportunity.DoesNotExist:
            pass

    app = GrantApplication.objects.create(
        academician=academician,
        grant_opportunity=grant_opp,
        project_title=project_title,
        executive_summary=data.get('executive_summary', ''),
        requested_amount=data.get('requested_amount', 0.0),
        status='SUBMITTED',
        submitted_at=timezone.now(),
        review_notes='',
    )

    # Create notification for user
    Notification.objects.create(
        user=academician.user,
        title="Grant Application Submitted",
        message=f"Proposal for '{project_title}' has been submitted for statutory review.",
        channel='IN_APP',
        type='SYSTEM_ALERT'
    )

    return app


@transaction.atomic
def create_industry_collaboration(academician: AcademicianProfile, data: dict) -> IndustryCollaboration:
    """
    Creates an industry collaboration / MoU docket.
    """
    title = data.get('title')
    company_name = data.get('company_name')
    if not title or not company_name:
        raise ValidationError("Title and Company Name are required.")

    collab = IndustryCollaboration.objects.create(
        academician=academician,
        company_name=company_name,
        title=title,
        collaboration_type=data.get('collaboration_type', 'RESEARCH'),
        description=data.get('description', ''),
        start_date=data.get('start_date', None),
        end_date=data.get('end_date', None),
        status=data.get('status', 'PROPOSED'),
        contract_value=data.get('contract_value', 0.0),
        outcomes=data.get('outcomes', ''),
        document_url=data.get('document_url', ''),
    )
    return collab


@transaction.atomic
def create_consultancy_project(academician: AcademicianProfile, data: dict) -> ConsultancyProject:
    """
    Creates an industrial consultancy project.
    """
    project_title = data.get('project_title')
    client_company = data.get('client_company')
    if not project_title or not client_company:
        raise ValidationError("Project title and Client company are required.")

    consultancy = ConsultancyProject.objects.create(
        academician=academician,
        client_company=client_company,
        project_title=project_title,
        description=data.get('description', ''),
        contract_value=data.get('contract_value', 0.0),
        institutional_share_pct=data.get('institutional_share_pct', 30.0),
        status=data.get('status', 'LEAD'),
        start_date=data.get('start_date', None),
        end_date=data.get('end_date', None),
        deliverables=data.get('deliverables', ''),
        hours_allocated=data.get('hours_allocated', 100),
        hours_delivered=data.get('hours_delivered', 0),
        invoice_status=data.get('invoice_status', 'PENDING_MILESTONE'),
    )
    return consultancy


@transaction.atomic
def register_for_fdp(academician: AcademicianProfile, program_id: str) -> FDPRegistration:
    """
    Registers the academician for a Faculty Development Program.
    """
    try:
        program = FDPProgram.objects.get(id=program_id)
    except FDPProgram.DoesNotExist:
        raise ValidationError("Selected FDP program does not exist.")

    reg, created = FDPRegistration.objects.get_or_create(
        academician=academician,
        program=program,
        defaults={'status': 'REGISTERED'}
    )
    if not created and reg.status == 'CANCELLED':
        reg.status = 'REGISTERED'
        reg.save()

    return reg


@transaction.atomic
def register_for_training(academician: AcademicianProfile, program_id: str) -> TrainingRegistration:
    """
    Registers the academician for an Industrial Training Program.
    """
    try:
        program = TrainingProgram.objects.get(id=program_id)
    except TrainingProgram.DoesNotExist:
        raise ValidationError("Selected Training program does not exist.")

    reg, created = TrainingRegistration.objects.get_or_create(
        academician=academician,
        program=program,
        defaults={'status': 'REGISTERED'}
    )
    return reg


@transaction.atomic
def register_for_workshop(academician: AcademicianProfile, workshop_id: str) -> WorkshopRegistration:
    """
    Registers the academician for a Workshop.
    """
    try:
        workshop = Workshop.objects.get(id=workshop_id)
    except Workshop.DoesNotExist:
        raise ValidationError("Selected Workshop does not exist.")

    reg, created = WorkshopRegistration.objects.get_or_create(
        academician=academician,
        workshop=workshop,
        defaults={'status': 'REGISTERED'}
    )
    return reg
