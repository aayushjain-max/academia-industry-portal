#!/usr/bin/env python
import os
import sys
from pathlib import Path
from datetime import datetime, date, timedelta, timezone

# Set up Django environment
BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BASE_DIR / 'apps' / 'api'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.development')

import django
django.setup()

from apps.users.models import User
from apps.students.models import StudentProfile, GuardianConsentStatus
from apps.industries.models import IndustryProfile
from apps.academicians.models import AcademicianProfile
from apps.institutions.models import InstitutionProfile
from apps.skills.models import Skill, StudentSkill, SkillCategory, SkillProficiency
from apps.opportunities.models import Opportunity, OpportunityType, OpportunityStatus
from apps.applications.models import Application, ApplicationStatus
from apps.assessments.models import Assessment, AssessmentQuestion, AssessmentAttempt, AssessmentType, AssessmentStatus, AttemptStatus
from apps.career.models import CareerPath, CareerReadinessScore, ActionPlan
from apps.learning.models import LearningResource, UserLearningProgress, IndustryTraining, LearningItemType
from apps.certifications.models import Certification
from apps.projects.models import Project
from apps.micro_internships.models import MicroInternship
from apps.internships.models import InternshipPosting
from apps.placements.models import PlacementDrive, PlacementRecord
from apps.mentorship.models import MentorshipProfile, MentorshipSession
from apps.portfolios.models import DigitalPortfolio
from apps.skill_passports.models import SkillPassport
from apps.gamification.models import Badge, UserGamification
from apps.notifications.models import Notification
from apps.documents.models import Document
from common.constants.roles import UserRole

DEFAULT_SEED_PASSWORD = os.getenv('SEED_DEFAULT_PASSWORD', 'Password123!')

def seed():
    print("[SEED] Starting comprehensive database seed...")

    # 1. Skills
    skills_data = [
        ("Python", SkillCategory.PROGRAMMING, "Core Python programming, data structures, and OOP."),
        ("TypeScript", SkillCategory.PROGRAMMING, "Type-safe JavaScript for frontend and backend applications."),
        ("JavaScript", SkillCategory.PROGRAMMING, "Modern ES6+ JavaScript for interactive web applications."),
        ("Django", SkillCategory.FRAMEWORKS, "High-level Python web framework for rapid development."),
        ("React", SkillCategory.FRAMEWORKS, "Component-based UI library for modern web applications."),
        ("FastAPI", SkillCategory.FRAMEWORKS, "High-performance Python microservices framework."),
        ("PostgreSQL", SkillCategory.DATABASES, "Advanced open-source relational database management system."),
        ("Redis", SkillCategory.DATABASES, "In-memory data structure store used as a database, cache, and broker."),
        ("Docker", SkillCategory.CLOUD_DEVOPS, "Containerization platform for reliable development and deployment."),
        ("Kubernetes", SkillCategory.CLOUD_DEVOPS, "Container orchestration system for automating application deployment."),
        ("Machine Learning", SkillCategory.AI_ML, "Statistical modeling, predictive algorithms, and scikit-learn."),
        ("Natural Language Processing", SkillCategory.AI_ML, "Text analysis, embeddings, LLMs, and semantic search."),
        ("System Design", SkillCategory.DOMAIN_KNOWLEDGE, "Distributed systems architecture and scalability principles."),
        ("Problem Solving", SkillCategory.SOFT_SKILLS, "Algorithmic thinking and analytical problem resolution."),
        ("Communication", SkillCategory.SOFT_SKILLS, "Professional technical writing and cross-functional presentation."),
    ]

    skill_instances = {}
    for name, cat, desc in skills_data:
        skill, _ = Skill.objects.get_or_create(
            name=name,
            defaults={'category': cat, 'description': desc}
        )
        skill_instances[name] = skill
    print(f"  + Seeded {len(skill_instances)} Core Skills")

    # 2. Demo Users & Profiles
    # 2.1 Student User
    student_user, _ = User.objects.get_or_create(
        email="student@example.com",
        defaults={
            'first_name': "Aarav",
            'last_name': "Sharma",
            'role': UserRole.STUDENT,
            'is_email_verified': True,
            'phone': "+91 9876543210",
            'onboarding_completed': True,
        }
    )
    student_user.set_password(DEFAULT_SEED_PASSWORD)
    student_user.save()

    student_profile, _ = StudentProfile.objects.get_or_create(
        user=student_user,
        defaults={
            'institution_name': "Indian Institute of Technology Bombay",
            'roll_number': "IITB2023CS101",
            'degree': "B.Tech Computer Science & Engineering",
            'department': "Computer Science",
            'year_of_study': 3,
            'cgpa': 8.92,
            'headline': "Aspiring Distributed Systems & AI Full-Stack Engineer",
            'bio': "Passionate about building resilient distributed architectures, AI agent workflows, and verified cryptographic credentials.",
            'github_url': "https://github.com/aarav-sharma-dev",
            'linkedin_url': "https://linkedin.com/in/aarav-sharma-tech",
            'guardian_consent_status': GuardianConsentStatus.CONFIRMED,
            'guardian_name': "Rajesh Sharma",
            'guardian_email': "guardian@example.com",
            'guardian_phone': "+91 9876543211",
            'portfolio_slug': "aarav-sharma",
        }
    )

    # Attach Student Skills
    student_skill_configs = [
        ("Python", SkillProficiency.ADVANCED, 92.0),
        ("React", SkillProficiency.INTERMEDIATE, 85.0),
        ("PostgreSQL", SkillProficiency.ADVANCED, 88.0),
        ("Docker", SkillProficiency.INTERMEDIATE, 78.0),
        ("TypeScript", SkillProficiency.INTERMEDIATE, 82.0),
        ("Django", SkillProficiency.ADVANCED, 90.0),
        ("System Design", SkillProficiency.BEGINNER, 70.0),
    ]
    for s_name, prof, score in student_skill_configs:
        if s_name in skill_instances:
            StudentSkill.objects.update_or_create(
                student=student_profile,
                skill=skill_instances[s_name],
                defaults={'proficiency': prof, 'is_verified': True, 'verified_score': score}
            )

    # 2.2 Industry User
    industry_user, _ = User.objects.get_or_create(
        email="recruiter@techcorp.com",
        defaults={
            'first_name': "Priya",
            'last_name': "Verma",
            'role': UserRole.INDUSTRY,
            'is_email_verified': True,
            'phone': "+91 9823012345",
            'onboarding_completed': True,
        }
    )
    industry_user.set_password(DEFAULT_SEED_PASSWORD)
    industry_user.save()

    industry_profile, _ = IndustryProfile.objects.get_or_create(
        user=industry_user,
        defaults={
            'company_name': "TechNova Labs Global",
            'website': "https://technova.example.com",
            'industry_sector': "Autonomous Systems & Cloud Infrastructure",
            'company_size': "501-1000",
            'headquarters': "Bangalore, India",
            'description': "Pioneering enterprise sovereign infrastructure, real-time distributed telemetry, and applied AI systems.",
            'is_verified': True,
        }
    )

    # 2.3 Academician User
    academic_user, _ = User.objects.get_or_create(
        email="professor@university.edu",
        defaults={
            'first_name': "Dr. Rajesh",
            'last_name': "Kulkarni",
            'role': UserRole.ACADEMICIAN,
            'is_email_verified': True,
            'phone': "+91 9811223344",
            'onboarding_completed': True,
        }
    )
    academic_user.set_password(DEFAULT_SEED_PASSWORD)
    academic_user.save()

    academic_profile, _ = AcademicianProfile.objects.get_or_create(
        user=academic_user,
        defaults={
            'institution_name': "Indian Institute of Technology Bombay",
            'department': "Computer Science & Engineering",
            'designation': "Professor & Research Director",
            'qualifications': "Ph.D. in Distributed Systems & Neural Telemetry (IISc / Stanford Postdoc)",
            'experience_years': 18,
            'areas_of_expertise': "Distributed Systems, Edge Neural Inference, Cryptographic Protocols",
            'publications': "42 international IEEE/ACM Q1 publications, 4 Indian Patents granted.",
            'research_interests': "Scalable Multi-Agent Verification, Low-Latency Caching, FPGA Acceleration",
            'is_verified': True,
        }
    )

    # 2.4 Institution Admin User
    institution_user, _ = User.objects.get_or_create(
        email="principal@iit.edu",
        defaults={
            'first_name': "IIT",
            'last_name': "Admin",
            'role': UserRole.INSTITUTION_ADMIN,
            'is_email_verified': True,
            'phone': "+91 9845098450",
            'onboarding_completed': True,
        }
    )
    institution_user.set_password(DEFAULT_SEED_PASSWORD)
    institution_user.save()

    institution_profile, _ = InstitutionProfile.objects.get_or_create(
        user=institution_user,
        defaults={
            'name': "Indian Institute of Technology Bombay",
            'code': "IIT-BOM-8042",
            'institution_type': "UNIVERSITY",
            'accreditation': "NAAC A++",
            'address': "Powai, Mumbai",
            'city': "Mumbai",
            'state': "Maharashtra",
            'country': "India",
            'website': "https://www.iitb.ac.in",
            'contact_email': "admin@iitb.ac.in",
            'is_verified': True,
            'total_students_enrolled': 12500,
            'placement_rate': 94.8,
        }
    )

    # 2.5 Superadmin User
    admin_user, _ = User.objects.get_or_create(
        email="admin@acadindportal.org",
        defaults={
            'first_name': "System",
            'last_name': "Administrator",
            'role': UserRole.SUPER_ADMIN,
            'is_staff': True,
            'is_superuser': True,
            'is_email_verified': True,
            'onboarding_completed': True,
        }
    )
    admin_user.set_password("AdminPassword123!")
    admin_user.save()

    print("  + Seeded 5 Demo Users (Student, Industry, Academician, Institution, Admin)")

    # 3. Opportunities
    opp1, _ = Opportunity.objects.get_or_create(
        title="Senior Distributed Systems & Backend Engineering Intern",
        industry=industry_profile,
        defaults={
            'opportunity_type': OpportunityType.INTERNSHIP,
            'description': "Design high-throughput event processing microservices in Python, FastAPI, and PostgreSQL with Redis caching.",
            'location': "Bengaluru / Remote",
            'is_remote': True,
            'stipend_or_salary': "INR 45,000 / month",
            'status': OpportunityStatus.ACTIVE,
            'openings_count': 5,
        }
    )
    opp1.required_skills.set([skill_instances["Python"], skill_instances["FastAPI"], skill_instances["PostgreSQL"], skill_instances["Docker"]])

    opp2, _ = Opportunity.objects.get_or_create(
        title="Full Stack React & TypeScript Systems Developer",
        industry=industry_profile,
        defaults={
            'opportunity_type': OpportunityType.JOB,
            'description': "Build responsive, telemetry-heavy dashboards with Next.js, TypeScript, Tailwind, and WebSocket data streams.",
            'location': "Bengaluru / Hybrid",
            'is_remote': False,
            'stipend_or_salary': "INR 18 - 24 LPA",
            'status': OpportunityStatus.ACTIVE,
            'openings_count': 3,
        }
    )
    opp2.required_skills.set([skill_instances["React"], skill_instances["TypeScript"], skill_instances["JavaScript"]])

    opp3, _ = Opportunity.objects.get_or_create(
        title="AI/ML Micro-Internship: Vector Indexing & RAG Retrieval",
        industry=industry_profile,
        defaults={
            'opportunity_type': OpportunityType.MICRO_INTERNSHIP,
            'description': "A 4-week structured sprint to build production embeddings pipeline using pgvector and semantic search.",
            'location': "Remote",
            'is_remote': True,
            'stipend_or_salary': "INR 25,000 Milestone Stipend",
            'status': OpportunityStatus.ACTIVE,
            'openings_count': 4,
        }
    )
    opp3.required_skills.set([skill_instances["Python"], skill_instances["Machine Learning"], skill_instances["Natural Language Processing"]])

    print("  + Seeded Active Opportunities (Internships, Jobs, Micro-Internships)")

    # 4. Applications
    Application.objects.update_or_create(
        student=student_profile,
        opportunity=opp1,
        defaults={
            'status': ApplicationStatus.SHORTLISTED,
            'cover_letter': "Extensive background in asynchronous microservices, PostgreSQL query optimization, and verifiable credentials.",
            'feedback': "Top candidate for distributed backend pod. Technical interview scheduled.",
        }
    )
    Application.objects.update_or_create(
        student=student_profile,
        opportunity=opp3,
        defaults={
            'status': ApplicationStatus.APPLIED,
            'cover_letter': "Excited about RAG vector pipelines and semantic search implementations.",
        }
    )
    print("  + Seeded Student Applications")

    # 5. Assessments & Questions & Attempts
    ass_tech, _ = Assessment.objects.get_or_create(
        title="Python Backend & Distributed Systems Evaluation",
        defaults={
            'slug': "python-backend-distributed-systems",
            'description': "Comprehensive evaluation covering Python concurrency, OOP, query optimization, and REST microservices.",
            'category': AssessmentType.TECHNICAL,
            'duration_minutes': 30,
            'total_questions': 3,
            'passing_score': 70,
            'status': AssessmentStatus.PUBLISHED,
            'skill_tags': ["Python", "PostgreSQL", "FastAPI", "Docker"]
        }
    )

    AssessmentQuestion.objects.update_or_create(
        assessment=ass_tech,
        order=1,
        defaults={
            'question_text': "What is the primary difference between a process and a thread in Python regarding the Global Interpreter Lock (GIL)?",
            'options': [
                "Threads share memory space and GIL limits pure Python bytecode execution to one thread per process",
                "Processes share identical memory addresses by default",
                "The GIL prevents any multi-process concurrency",
                "Threads run on separate CPU cores concurrently without restrictions"
            ],
            'correct_option': 0,
            'category': AssessmentType.TECHNICAL,
            'skill_tag': "Python",
            'difficulty': "intermediate",
            'points': 35,
            'explanation': "The Python GIL ensures thread-safe memory management by allowing only one native thread to hold the Python interpreter lock."
        }
    )

    AssessmentQuestion.objects.update_or_create(
        assessment=ass_tech,
        order=2,
        defaults={
            'question_text': "Which technique avoids N+1 query overhead when querying ForeignKey relations in Django ORM?",
            'options': [
                "select_related() for single-valued relationships and prefetch_related() for multi-valued relationships",
                "raw SQL queries wrapped in raw_query()",
                "only() and defer() without joining tables",
                "filter_related() annotations"
            ],
            'correct_option': 0,
            'category': AssessmentType.TECHNICAL,
            'skill_tag': "PostgreSQL",
            'difficulty': "intermediate",
            'points': 35,
            'explanation': "select_related performs SQL joins for foreign keys, while prefetch_related performs batch lookups for many-to-many/reverse keys."
        }
    )

    AssessmentQuestion.objects.update_or_create(
        assessment=ass_tech,
        order=3,
        defaults={
            'question_text': "What is the idempotency property of HTTP PUT versus HTTP POST requests in RESTful API design?",
            'options': [
                "PUT is idempotent (multiple identical requests yield same state); POST is not idempotent",
                "POST is idempotent; PUT is non-idempotent",
                "Both PUT and POST are always idempotent",
                "Neither PUT nor POST are idempotent"
            ],
            'correct_option': 0,
            'category': AssessmentType.TECHNICAL,
            'skill_tag': "FastAPI",
            'difficulty': "beginner",
            'points': 30,
            'explanation': "PUT replaces target resource state completely, making multiple identical calls have the exact same effect as one."
        }
    )

    # Seed Assessment Attempt
    AssessmentAttempt.objects.update_or_create(
        assessment=ass_tech,
        student=student_profile,
        defaults={
            'status': AttemptStatus.PASSED,
            'score_percentage': 92.0,
            'score_raw': 9.2,
            'total_questions': 3,
            'correct_count': 3,
            'time_spent_seconds': 740,
            'topic_breakdown': [
                {'skill_tag': 'Python', 'correct': 1, 'total': 1, 'score': 100.0},
                {'skill_tag': 'PostgreSQL', 'correct': 1, 'total': 1, 'score': 100.0},
                {'skill_tag': 'FastAPI', 'correct': 1, 'total': 1, 'score': 100.0}
            ],
            'submitted_answers': {0: 0, 1: 0, 2: 0},
            'completed_at': datetime.now(timezone.utc)
        }
    )
    print("  + Seeded Assessments & Completed Student Attempts")

    # 6. Career Paths & Readiness Scores & Action Plans
    CareerPath.objects.get_or_create(
        title="Senior Distributed Systems Architect",
        defaults={
            'industry': "Cloud & Enterprise Software",
            'description': "Lead design and deployment of high-throughput distributed microservices, consensus engines, and event buses.",
            'core_skills': ["Python", "FastAPI", "PostgreSQL", "Docker", "Kubernetes", "System Design"],
            'salary_range': {"min": 1800000, "max": 2800000, "currency": "INR"},
            'growth_projection': "High (+38% YoY)",
            'recommended_steps': ["Master Python concurrency", "Learn PostgreSQL indexing", "Deploy Kubernetes clusters"]
        }
    )

    CareerReadinessScore.objects.update_or_create(
        student=student_profile,
        defaults={
            'overall_score': 86,
            'technical_score': 92,
            'soft_skill_score': 80,
            'project_score': 88,
            'certification_score': 85,
            'experience_score': 82,
            'explanation': "Outstanding distributed systems and database competencies. High alignment with Senior Backend Developer requisitions."
        }
    )

    ActionPlan.objects.update_or_create(
        student=student_profile,
        target_role="Senior Distributed Backend Engineer",
        defaults={
            'skill_gap': "Kubernetes Production Cluster Management & gRPC Protocols",
            'priority': "HIGH",
            'steps': [
                {"id": "step-1", "title": "Complete Multi-Stage Container Orchestration Lab", "description": "Deploy distributed replicas in Kubernetes.", "status": "COMPLETED", "resourceLink": "/student/learning"},
                {"id": "step-2", "title": "Publish Live Project Benchmark", "description": "Benchmark Celery + Redis queue at 10,000 RPS.", "status": "IN_PROGRESS", "resourceLink": "/student/projects"},
                {"id": "step-3", "title": "Complete System Design Mock Diagnostic", "description": "Pass high-concurrency partition tolerance assessment.", "status": "NOT_STARTED", "resourceLink": "/student/assessments"}
            ]
        }
    )
    print("  + Seeded Career Readiness & Action Plans")

    # 7. Learning Resources & Progress
    lr1, _ = LearningResource.objects.get_or_create(
        title="Enterprise Kubernetes & Cloud Native Architecture",
        defaults={
            'provider': "TechNova Cloud Academy",
            'type': LearningItemType.COURSE,
            'url': "https://learn.portal.example.com/k8s-cloud",
            'duration_hours': 16,
            'difficulty': "INTERMEDIATE",
            'rating': 4.9
        }
    )
    lr1.skills_targeted.set([skill_instances["Docker"], skill_instances["Kubernetes"]])

    lr2, _ = LearningResource.objects.get_or_create(
        title="Advanced PostgreSQL Indexing & Query Tuning",
        defaults={
            'provider': "PostgreSQL Global Development Group",
            'type': LearningItemType.MODULE,
            'url': "https://learn.portal.example.com/pg-tuning",
            'duration_hours': 10,
            'difficulty': "ADVANCED",
            'rating': 4.95
        }
    )
    lr2.skills_targeted.set([skill_instances["PostgreSQL"]])

    UserLearningProgress.objects.update_or_create(
        student=student_profile,
        resource=lr1,
        defaults={'progress_percentage': 85.0, 'status': 'IN_PROGRESS'}
    )
    UserLearningProgress.objects.update_or_create(
        student=student_profile,
        resource=lr2,
        defaults={'progress_percentage': 100.0, 'status': 'COMPLETED', 'completed_at': datetime.now(timezone.utc)}
    )

    IndustryTraining.objects.get_or_create(
        title="Distributed Event Driven Telemetry & Kafka Pipelines",
        industry=industry_profile,
        defaults={
            'description': "6-week immersive industry training mentored by TechNova Principal Engineers.",
            'duration_weeks': 6,
            'max_participants': 50,
            'mode': "ONLINE",
            'is_active': True
        }
    )
    print("  + Seeded Learning Resources & Progress")

    # 8. Certifications & Projects & Micro-Internships
    Certification.objects.update_or_create(
        student=student_profile,
        title="Certified Python Solutions Architect & Systems Engineer",
        defaults={
            'issuing_organization': "Python Software Foundation & AICTE",
            'issue_date': date(2026, 1, 15),
            'credential_id': "PSF-ARCH-98231",
            'credential_url': "https://certs.psf.org/verify/98231",
            'verification_status': "VERIFIED"
        }
    )

    Project.objects.update_or_create(
        student=student_profile,
        title="Cryptographic Skill Passport & Distributed Verification Registry",
        defaults={
            'description': "Built a decentralized SHA-256 verifiable credential passport with QR verification for SIH 2024.",
            'project_type': "INDUSTRY_LIVE",
            'skills_used': ["Python", "FastAPI", "PostgreSQL", "Next.js", "Docker"],
            'repo_url': "https://github.com/aarav-sharma-dev/skill-passport",
            'is_verified': True
        }
    )

    MicroInternship.objects.get_or_create(
        title="Real-Time Telemetry Stream & Redis In-Memory Cache Optimization",
        industry=industry_profile,
        defaults={
            'problem_statement': "Implement sub-millisecond query caching layer for high-concurrency telemetry feeds.",
            'deliverables': ["Redis cluster caching wrapper", "Latency benchmark suite"],
            'duration_days': 21,
            'stipend': "INR 20,000",
            'status': "OPEN"
        }
    )

    InternshipPosting.objects.get_or_create(
        opportunity=opp1,
        defaults={
            'internship_type': 'SEMESTER_LONG',
            'weekly_hours': 40,
            'mentorship_provided': True,
            'certificate_provided': True,
            'ppo_eligible': True,
        }
    )

    # 9. Placements & Drives
    pd1, _ = PlacementDrive.objects.get_or_create(
        company=industry_profile,
        title="TechNova 2026 Super-Dream Campus Placement Drive",
        defaults={
            'eligible_branches': ["Computer Science", "Information Technology", "Electronics & Telecommunication"],
            'minimum_cgpa': 7.5,
            'package_lpa': 22.0,
            'drive_date': date.today() + timedelta(days=14),
            'rounds': ["Online Coding Assessment", "System Design Round", "Leadership & Culture Fit"],
            'status': 'UPCOMING'
        }
    )

    PlacementRecord.objects.get_or_create(
        student=student_profile,
        drive=pd1,
        defaults={
            'package_offered_lpa': 22.0,
            'status': 'OFFERED',
            'offer_letter_url': 'https://portal.example.com/offers/TN-2026-AARAV.pdf'
        }
    )
    print("  + Seeded Certifications, Projects, Internships, and Placement Drives")

    # 10. Mentorship
    MentorshipProfile.objects.update_or_create(
        user=academic_user,
        defaults={
            'expertise': ["Distributed Systems", "Research Strategy", "Cloud Architecture"],
            'company_or_institution': "IIT Bombay",
            'designation': "Professor & Research Director",
            'bio': "Mentoring ambitious engineering students transitioning to high-impact industrial research and systems engineering."
        }
    )

    MentorshipSession.objects.get_or_create(
        mentor=academic_user,
        mentee=student_user,
        defaults={
            'topic': "Architectural Patterns in Distributed Systems & Preparing for Tier-1 Tech Interviews",
            'scheduled_at': datetime.now(timezone.utc) + timedelta(days=5),
            'status': "SCHEDULED"
        }
    )

    # 11. Skill Passport & Digital Portfolio
    SkillPassport.objects.update_or_create(
        student=student_profile,
        defaults={
            'passport_number': "SP-AARAV-2026-8042",
            'cryptographic_signature': "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
            'verified_credentials_snapshot': [
                {"name": "Python Backend Architecture", "proficiency": "ADVANCED", "score": 92},
                {"name": "PostgreSQL Query Optimization", "proficiency": "ADVANCED", "score": 88},
                {"name": "React & TypeScript Systems", "proficiency": "INTERMEDIATE", "score": 85},
                {"name": "Docker & Containerization", "proficiency": "INTERMEDIATE", "score": 78}
            ],
            'is_valid': True
        }
    )

    DigitalPortfolio.objects.update_or_create(
        student=student_profile,
        defaults={
            'username': "aarav-sharma",
            'is_public': True,
            'custom_theme': "dark",
            'views_count': 512,
            'achievements': ["Smart India Hackathon Finalist", "Rank 1 in IITB Backend Hackathon", "Published PyPI Package"]
        }
    )

    # 12. Gamification & Badges
    badge1, _ = Badge.objects.get_or_create(
        name="Systems Architect",
        defaults={
            'slug': "systems-architect",
            'description': "Scored > 90% in Python & Distributed Systems Assessment.",
            'icon': "workspace_premium",
            'points_reward': 150
        }
    )
    badge2, _ = Badge.objects.get_or_create(
        name="Verified Credential Pioneer",
        defaults={
            'slug': "verified-credential-pioneer",
            'description': "Successfully generated cryptographic Skill Passport with SIH 2024 notary.",
            'icon': "verified_user",
            'points_reward': 200
        }
    )

    user_game, _ = UserGamification.objects.update_or_create(
        user=student_user,
        defaults={
            'total_points': 680,
            'streak_days': 15
        }
    )
    user_game.badges.add(badge1, badge2)

    # 13. Notifications & Documents
    Notification.objects.get_or_create(
        user=student_user,
        title="Application Shortlisted by TechNova Labs",
        defaults={
            'message': "TechNova Labs has reviewed your profile and shortlisted your application for Senior Backend Intern.",
            'type': "APPLICATION_UPDATE",
            'channel': "IN_APP",
            'is_read': False
        }
    )

    Notification.objects.get_or_create(
        user=student_user,
        title="Mentorship Session Confirmed with Dr. Rajesh Kulkarni",
        defaults={
            'message': "Your 1-on-1 session on Distributed Systems Architecture is scheduled for this Friday.",
            'type': "MENTORSHIP",
            'channel': "IN_APP",
            'is_read': True
        }
    )

    Document.objects.get_or_create(
        user=student_user,
        title="Aarav_Sharma_Resume_2026.pdf",
        defaults={
            'document_type': 'RESUME',
            'file_url': '/media/documents/aarav_sharma_resume.pdf',
            'file_size_bytes': 142000,
            'mime_type': 'application/pdf',
            'is_verified': True
        }
    )

    print("\n[SUCCESS] All datasets seeded cleanly and comprehensively!")
    print("-------------------------------------------------------------------------")
    print("Demo Credentials:")
    print("  Student:      student@example.com       | Password: Password123!")
    print("  Industry:     recruiter@techcorp.com    | Password: Password123!")
    print("  Academician:  professor@university.edu  | Password: Password123!")
    print("  Institution:  principal@iit.edu         | Password: Password123!")
    print("  Superadmin:   admin@acadindportal.org   | Password: AdminPassword123!")
    print("-------------------------------------------------------------------------")

if __name__ == '__main__':
    seed()


