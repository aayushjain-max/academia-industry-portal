from decimal import Decimal
from django.db.models import Sum, Count, Avg, Q
from django.core.exceptions import ObjectDoesNotExist
from .models import (
    AcademicianProfile,
    Publication,
    Patent,
    ResearchProject,
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
from apps.students.models import StudentProfile
from apps.mentorship.models import MentorshipSession
from apps.skills.models import Skill, StudentSkill
from apps.opportunities.models import Opportunity
from apps.applications.models import Application, ApplicationStatus
from apps.career.models import CareerReadinessScore


def get_academician_for_user(user) -> AcademicianProfile:
    """
    Returns the authenticated user's AcademicianProfile, creating a default one if needed.
    """
    profile, _ = AcademicianProfile.objects.get_or_create(
        user=user,
        defaults={
            'institution_name': 'Affiliated University',
            'department': 'Computer Science & Engineering',
            'designation': 'Assistant Professor',
            'qualifications': 'Ph.D.',
            'experience_years': 5,
        }
    )
    return profile


def get_academician_dashboard_metrics(academician: AcademicianProfile) -> dict:
    """
    Computes real, dynamic KPI aggregates deriving entirely from database state.
    """
    # Mentorship aggregates
    user = academician.user
    mentorship_sessions = MentorshipSession.objects.filter(mentor=user)
    pending_mentorship = mentorship_sessions.filter(status='REQUESTED').count()
    active_mentees_count = mentorship_sessions.filter(status__in=['SCHEDULED', 'COMPLETED']).values('mentee').distinct().count()
    completed_sessions = mentorship_sessions.filter(status='COMPLETED').count()

    # Research projects aggregates
    research_qs = academician.research_projects.all()
    active_projects = research_qs.filter(status='ACTIVE').count()
    total_projects = research_qs.count()
    total_funding_val = research_qs.aggregate(total=Sum('funding_amount'))['total'] or Decimal('0.00')
    completed_milestones = ResearchMilestone.objects.filter(project__academician=academician, status='COMPLETED').count()
    pending_milestones = ResearchMilestone.objects.filter(project__academician=academician, status__in=['PENDING', 'IN_PROGRESS']).count()

    # Publications & Patents
    pub_qs = academician.publications.all()
    total_publications = pub_qs.count()
    scopus_publications = pub_qs.filter(indexing__icontains='SCOPUS').count()
    total_citations = pub_qs.aggregate(total=Sum('citation_count'))['total'] or 0

    # Approximate h-index from citation counts
    citations_list = sorted(list(pub_qs.values_list('citation_count', flat=True)), reverse=True)
    h_index = 0
    for idx, c in enumerate(citations_list, 1):
        if c >= idx:
            h_index = idx
        else:
            break

    patent_qs = academician.patents.all()
    total_patents = patent_qs.count()
    granted_patents = patent_qs.filter(status='GRANTED').count()

    # Grants
    grant_app_qs = academician.grant_applications.all()
    proposals_in_review = grant_app_qs.filter(status__in=['SUBMITTED', 'UNDER_REVIEW']).count()
    approved_grants = grant_app_qs.filter(status__in=['APPROVED', 'DISBURSED']).count()
    approved_grant_funds = grant_app_qs.filter(status__in=['APPROVED', 'DISBURSED']).aggregate(total=Sum('requested_amount'))['total'] or Decimal('0.00')

    # Consultancy
    consultancy_qs = academician.consultancies.all()
    active_consultancies = consultancy_qs.filter(status__in=['CONTRACT', 'ACTIVE', 'MILESTONES_IN_REVIEW']).count()
    total_consultancy_val = consultancy_qs.aggregate(total=Sum('contract_value'))['total'] or Decimal('0.00')
    total_hours_delivered = consultancy_qs.aggregate(total=Sum('hours_delivered'))['total'] or 0

    # Collaborations
    collab_qs = academician.collaborations.all()
    active_collaborations = collab_qs.filter(status__in=['APPROVED', 'ACTIVE']).count()

    # Faculty Development Registrations
    fdp_count = academician.fdp_registrations.filter(status__in=['REGISTERED', 'ATTENDED', 'COMPLETED']).count()
    training_count = academician.training_registrations.filter(status__in=['REGISTERED', 'IN_TRAINING', 'COMPLETED']).count()
    workshop_count = academician.workshop_registrations.filter(status__in=['REGISTERED', 'ATTENDED', 'COMPLETED']).count()

    # Department student stats
    dept_name = academician.department
    inst_name = academician.institution_name
    student_qs = StudentProfile.objects.all()
    if dept_name:
        student_qs = student_qs.filter(department__icontains=dept_name)
    if inst_name:
        student_qs = student_qs.filter(institution_name__icontains=inst_name)
    
    total_dept_students = student_qs.count()
    avg_readiness = CareerReadinessScore.objects.filter(student__in=student_qs).aggregate(avg=Avg('overall_score'))['avg']
    avg_readiness_val = round(float(avg_readiness), 1) if avg_readiness is not None else 0.0

    return {
        'profile': {
            'id': str(academician.id),
            'name': f"{academician.user.first_name} {academician.user.last_name}".strip() or academician.user.email,
            'email': academician.user.email,
            'designation': academician.designation,
            'department': academician.department,
            'institution_name': academician.institution_name,
            'experience_years': academician.experience_years,
            'is_verified': academician.is_verified,
            'orcid': academician.orcid,
            'avatar_url': academician.avatar_url,
        },
        'scholastic_metrics': {
            'mentorship_requests': pending_mentorship,
            'active_mentees': active_mentees_count,
            'completed_mentorship_sessions': completed_sessions,
            'active_research_projects': active_projects,
            'total_research_projects': total_projects,
            'total_research_funding': float(total_funding_val),
            'completed_milestones': completed_milestones,
            'pending_milestones': pending_milestones,
            'total_publications': total_publications,
            'scopus_publications': scopus_publications,
            'total_citations': total_citations,
            'h_index': h_index,
            'total_patents': total_patents,
            'granted_patents': granted_patents,
            'proposals_in_review': proposals_in_review,
            'approved_grants': approved_grants,
            'approved_grant_funds': float(approved_grant_funds),
            'active_consultancies': active_consultancies,
            'total_consultancy_value': float(total_consultancy_val),
            'total_consultancy_hours': total_hours_delivered,
            'active_collaborations': active_collaborations,
            'fdp_registered': fdp_count,
            'training_registered': training_count,
            'workshops_registered': workshop_count,
        },
        'department_summary': {
            'total_students': total_dept_students,
            'average_readiness_score': avg_readiness_val,
        }
    }


def get_department_students_list(
    academician: AcademicianProfile,
    batch: str = None,
    readiness_category: str = None,
    search: str = None
):
    """
    Returns scoped list of students for the academician's department with live skill gaps and readiness indices.
    """
    qs = StudentProfile.objects.select_related('user', 'readiness_score').prefetch_related('skills__skill', 'action_plans')
    
    if academician.department:
        qs = qs.filter(department__icontains=academician.department)
    if academician.institution_name:
        qs = qs.filter(institution_name__icontains=academician.institution_name)

    if batch:
        try:
            year = int(batch)
            qs = qs.filter(year_of_study=year)
        except ValueError:
            pass

    if search:
        qs = qs.filter(
            Q(user__first_name__icontains=search) |
            Q(user__last_name__icontains=search) |
            Q(user__email__icontains=search) |
            Q(roll_number__icontains=search)
        )

    students_data = []
    for s in qs:
        score_obj = getattr(s, 'readiness_score', None)
        overall_score = score_obj.overall_score if score_obj else 0
        
        # Categorize readiness
        if overall_score >= 80:
            category = 'INDUSTRY_READY'
            badge_color = 'success'
        elif overall_score >= 65:
            category = 'ALMOST_READY'
            badge_color = 'warning'
        elif overall_score >= 50:
            category = 'NEEDS_INTERVENTION'
            badge_color = 'signal'
        else:
            category = 'AT_RISK'
            badge_color = 'danger'

        if readiness_category and readiness_category.upper() != 'ALL':
            if category != readiness_category.upper():
                continue

        skills_list = [
            {
                'name': ss.skill.name,
                'proficiency': ss.proficiency,
                'is_verified': ss.is_verified,
            }
            for ss in s.skills.all()[:5]
        ]

        students_data.append({
            'id': str(s.id),
            'name': f"{s.user.first_name} {s.user.last_name}".strip() or s.user.email,
            'email': s.user.email,
            'roll_number': s.roll_number,
            'degree': s.degree or 'B.Tech',
            'department': s.department,
            'year_of_study': s.year_of_study or 1,
            'cgpa': float(s.cgpa) if s.cgpa else None,
            'readiness_score': overall_score,
            'readiness_category': category,
            'badge_color': badge_color,
            'skills': skills_list,
            'action_plan_count': s.action_plans.count(),
        })

    return students_data


def get_department_skill_heatmap_data(academician: AcademicianProfile, batch: str = None):
    """
    Computes a 2D batch x skill demand matrix based on live student proficiencies vs industry requirements.
    """
    dept = academician.department
    inst = academician.institution_name

    student_qs = StudentProfile.objects.all()
    if dept:
        student_qs = student_qs.filter(department__icontains=dept)
    if inst:
        student_qs = student_qs.filter(institution_name__icontains=inst)

    top_skills = list(Skill.objects.annotate(opp_count=Count('opportunities')).order_by('-opp_count')[:6])
    if not top_skills:
        top_skills = list(Skill.objects.all()[:6])

    skill_columns = [s.name for s in top_skills]

    cohorts = [
        {'cohort': 'Year 4 (Final Year)', 'year': 4},
        {'cohort': 'Year 3 (Pre-Final)', 'year': 3},
        {'cohort': 'Year 2 (Sophomore)', 'year': 2},
        {'cohort': 'Year 1 (Freshman)', 'year': 1},
    ]

    heatmap_rows = []
    for c in cohorts:
        cohort_students = student_qs.filter(year_of_study=c['year'])
        total_in_cohort = max(cohort_students.count(), 1)
        row = {'cohort': c['cohort'], 'year': c['year'], 'student_count': cohort_students.count(), 'skills': {}}

        for skill in top_skills:
            student_with_skill_count = StudentSkill.objects.filter(
                student__in=cohort_students,
                skill=skill
            ).count()
            # Calculate average proficiency score (0 - 100)
            avg_pct = round((student_with_skill_count / total_in_cohort) * 100)
            row['skills'][skill.name] = avg_pct

        heatmap_rows.append(row)

    return {
        'skill_columns': skill_columns,
        'cohorts': heatmap_rows,
    }


def get_curriculum_industry_alignment_data(academician: AcademicianProfile):
    """
    Compares student and faculty skill proficiencies against active industry opportunity requirements.
    """
    # Fetch top requested skills across all active industry opportunities
    skills_with_demand = Skill.objects.annotate(
        demand_count=Count('opportunities', filter=Q(opportunities__is_active=True)),
        supply_count=Count('student_skills')
    ).order_by('-demand_count')[:8]

    total_opps = max(Opportunity.objects.filter(is_active=True).count(), 1)
    total_students = max(StudentProfile.objects.count(), 1)

    alignment_items = []
    for s in skills_with_demand:
        demand_pct = min(100, round((s.demand_count / total_opps) * 100))
        supply_pct = min(100, round((s.supply_count / total_students) * 100))
        gap = max(0, demand_pct - supply_pct)

        if gap > 35:
            prescription = f"Urgent: Add dedicated lab module and elective for {s.name}."
            status_tag = 'CRITICAL GAP'
        elif gap > 15:
            prescription = f"Recommended: Organize industry masterclass / workshop on {s.name}."
            status_tag = 'MODERATE GAP'
        else:
            prescription = f"Curriculum well-aligned with current industrial demand for {s.name}."
            status_tag = 'ALIGNED'

        alignment_items.append({
            'skill_name': s.name,
            'category': s.category or 'Core Engineering',
            'demand_score': demand_pct,
            'curriculum_supply_score': supply_pct,
            'gap': gap,
            'status_tag': status_tag,
            'prescription': prescription,
        })

    return {
        'department': academician.department,
        'alignments': alignment_items,
    }


def calculate_faculty_impact_score(academician: AcademicianProfile) -> dict:
    """
    Evidence-based composite impact score transparently derived from verified records.
    """
    # 1. Research Funding Score (up to 25 pts)
    total_funding = float(academician.research_projects.aggregate(total=Sum('funding_amount'))['total'] or 0)
    funding_score = min(25, int((total_funding / 1000000) * 5))  # 5 pts per 10 Lakhs

    # 2. Publications & Citations (up to 25 pts)
    pub_count = academician.publications.count()
    citation_count = academician.publications.aggregate(total=Sum('citation_count'))['total'] or 0
    publication_score = min(25, (pub_count * 3) + min(10, int(citation_count / 20)))

    # 3. Patents & IP (up to 15 pts)
    patent_count = academician.patents.filter(status__in=['GRANTED', 'PUBLISHED', 'FILED']).count()
    patent_score = min(15, patent_count * 5)

    # 4. Industry Collaboration & Consultancy (up to 20 pts)
    collab_count = academician.collaborations.count()
    consult_count = academician.consultancies.count()
    industry_score = min(20, (collab_count * 4) + (consult_count * 4))

    # 5. Mentorship & Student Guidance (up to 15 pts)
    mentorship_sessions = MentorshipSession.objects.filter(mentor=academician.user, status='COMPLETED').count()
    mentorship_score = min(15, mentorship_sessions * 3)

    total_score = min(100, funding_score + publication_score + patent_score + industry_score + mentorship_score)

    return {
        'total_impact_score': total_score,
        'breakdown': {
            'research_funding': {'score': funding_score, 'max': 25, 'evidence': f"₹{total_funding:,.2f} in grants"},
            'publications_citations': {'score': publication_score, 'max': 25, 'evidence': f"{pub_count} papers, {citation_count} citations"},
            'patents_ip': {'score': patent_score, 'max': 15, 'evidence': f"{patent_count} patents registered"},
            'industry_collaboration': {'score': industry_score, 'max': 20, 'evidence': f"{collab_count} MoUs, {consult_count} consultancies"},
            'student_mentorship': {'score': mentorship_score, 'max': 15, 'evidence': f"{mentorship_sessions} completed sessions"},
        }
    }
