#!/usr/bin/env python
import os
import sys
from pathlib import Path

# Set up Django environment
BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BASE_DIR / 'apps' / 'api'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.development')

import django
django.setup()

from apps.users.models import User
from apps.students.models import StudentProfile
from apps.industries.models import IndustryProfile
from apps.skills.models import Skill, StudentSkill, SkillCategory, SkillProficiency
from apps.opportunities.models import Opportunity, OpportunityType, OpportunityStatus
from apps.applications.models import Application, ApplicationStatus
from common.constants.roles import UserRole

def seed():
    print("[SEED] Starting database seed...")

    # 1. Seed Skills
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
        ("Machine Learning", SkillCategory.AI_ML, "Statistical modeling, predictive algorithms, and scikit-learn."),
        ("Natural Language Processing", SkillCategory.AI_ML, "Text analysis, embeddings, LLMs, and semantic search."),
        ("UI/UX Design", SkillCategory.DOMAIN_KNOWLEDGE, "User interface design, wireframing, and usability testing."),
        ("Problem Solving", SkillCategory.SOFT_SKILLS, "Algorithmic thinking and analytical problem resolution."),
    ]

    skill_instances = {}
    for name, cat, desc in skills_data:
        skill, created = Skill.objects.get_or_create(
            name=name,
            defaults={'category': cat, 'description': desc}
        )
        skill_instances[name] = skill
        if created:
            print(f"  + Created skill: {name}")

    # 2. Seed Demo Student
    student_user, created = User.objects.get_or_create(
        email="student@example.com",
        defaults={
            'first_name': "Aarav",
            'last_name': "Sharma",
            'role': UserRole.STUDENT,
            'is_email_verified': True,
        }
    )
    if created:
        student_user.set_password("Password123!")
        student_user.save()
        print("  + Created demo student user: student@example.com")

    student_profile, _ = StudentProfile.objects.get_or_create(
        user=student_user,
        defaults={
            'institution_name': "Indian Institute of Technology",
            'roll_number': "IIT2023CS101",
            'degree': "B.Tech Computer Science & Engineering",
            'department': "Computer Science",
            'year_of_study': 3,
            'cgpa': 8.92,
            'headline': "Aspiring Full Stack Engineer & Open Source Enthusiast",
            'bio': "Passionate about building scalable distributed systems and AI-powered web applications.",
            'github_url': "https://github.com/demo-student",
            'linkedin_url': "https://linkedin.com/in/demo-student",
        }
    )

    # Attach skills to student
    for s_name, prof in [("Python", SkillProficiency.ADVANCED), ("React", SkillProficiency.INTERMEDIATE), ("PostgreSQL", SkillProficiency.INTERMEDIATE), ("Docker", SkillProficiency.BEGINNER)]:
        if s_name in skill_instances:
            StudentSkill.objects.get_or_create(
                student=student_profile,
                skill=skill_instances[s_name],
                defaults={'proficiency': prof, 'is_verified': True, 'verified_score': 85.0}
            )

    # 3. Seed Demo Industry User & Company
    industry_user, created = User.objects.get_or_create(
        email="recruiter@techcorp.com",
        defaults={
            'first_name': "Priya",
            'last_name': "Verma",
            'role': UserRole.INDUSTRY,
            'is_email_verified': True,
        }
    )
    if created:
        industry_user.set_password("Password123!")
        industry_user.save()
        print("  + Created demo industry user: recruiter@techcorp.com")

    industry_profile, _ = IndustryProfile.objects.get_or_create(
        user=industry_user,
        defaults={
            'company_name': "TechCorp Global Solutions",
            'website': "https://techcorp.example.com",
            'industry_sector': "Software & Cloud Engineering",
            'company_size': "201-500",
            'headquarters': "Bangalore, India",
            'description': "Leading enterprise SaaS company building next-generation collaboration platforms.",
            'is_verified': True,
        }
    )

    # 4. Seed Demo Opportunities
    opp1, created = Opportunity.objects.get_or_create(
        title="Full Stack Python/React Developer Intern",
        industry=industry_profile,
        defaults={
            'opportunity_type': OpportunityType.INTERNSHIP,
            'description': "Join our core engineering team building high-throughput microservices and responsive web portals.",
            'location': "Bangalore / Remote",
            'is_remote': True,
            'stipend_or_salary': "INR 30,000 / month",
            'status': OpportunityStatus.ACTIVE,
            'openings_count': 3,
        }
    )
    if created:
        opp1.required_skills.set([skill_instances["Python"], skill_instances["React"], skill_instances["PostgreSQL"]])
        print("  + Created opportunity: Full Stack Python/React Developer Intern")

    opp2, created = Opportunity.objects.get_or_create(
        title="AI/ML Micro-Internship: Semantic Search Engine",
        industry=industry_profile,
        defaults={
            'opportunity_type': OpportunityType.MICRO_INTERNSHIP,
            'description': "A 4-week focused project to implement vector similarity search and RAG retrieval pipelines.",
            'location': "Remote",
            'is_remote': True,
            'stipend_or_salary': "INR 15,000 stipend upon milestone completion",
            'status': OpportunityStatus.ACTIVE,
            'openings_count': 2,
        }
    )
    if created:
        opp2.required_skills.set([skill_instances["Python"], skill_instances["Machine Learning"], skill_instances["Natural Language Processing"]])
        print("  + Created opportunity: AI/ML Micro-Internship")

    # 5. Seed Demo Application
    app, created = Application.objects.get_or_create(
        student=student_profile,
        opportunity=opp1,
        defaults={
            'status': ApplicationStatus.SHORTLISTED,
            'cover_letter': "I have experience with Python, Django, and React through multiple university projects and would love to contribute to TechCorp.",
            'feedback': "Strong profile and good GitHub portfolio. Scheduled for technical interview.",
        }
    )
    if created:
        print("  + Created demo application: Student -> Full Stack Intern (Status: SHORTLISTED)")

    # 6. Seed Academician User & Profile
    from apps.academicians.models import AcademicianProfile
    academic_user, created = User.objects.get_or_create(
        email="professor@university.edu",
        defaults={
            'first_name': "Dr. Rajesh",
            'last_name': "Kulkarni",
            'role': UserRole.ACADEMICIAN,
            'is_email_verified': True,
        }
    )
    if created:
        academic_user.set_password("Password123!")
        academic_user.save()
        print("  + Created demo academician user: professor@university.edu")

    academic_profile, _ = AcademicianProfile.objects.get_or_create(
        user=academic_user,
        defaults={
            'institution_name': "Indian Institute of Technology",
            'department': "Computer Science & Engineering",
            'designation': "Professor & Dean of Research",
            'qualifications': "Ph.D. in Distributed Systems & AI",
            'experience_years': 18,
            'areas_of_expertise': "Distributed Systems, Machine Learning, Cloud Architecture",
            'publications': "Over 40 international IEEE/ACM publications in cloud computing and autonomous agents.",
            'research_interests': "Scalable Multi-Agent Collaboration, Real-Time Edge Analytics",
            'is_verified': True,
        }
    )

    # 7. Seed Institution User & Profile
    from apps.institutions.models import InstitutionProfile
    institution_user, created = User.objects.get_or_create(
        email="principal@iit.edu",
        defaults={
            'first_name': "IIT",
            'last_name': "Admin",
            'role': UserRole.INSTITUTION_ADMIN,
            'is_email_verified': True,
        }
    )
    if created:
        institution_user.set_password("Password123!")
        institution_user.save()
        print("  + Created demo institution user: principal@iit.edu")

    institution_profile, _ = InstitutionProfile.objects.get_or_create(
        user=institution_user,
        defaults={
            'name': "Indian Institute of Technology, Bangalore Campus",
            'code': "IIT-BLR",
            'institution_type': "UNIVERSITY",
            'accreditation': "NAAC A++",
            'address': "Electronic City Phase 1",
            'city': "Bangalore",
            'state': "Karnataka",
            'country': "India",
            'website': "https://iitblr.example.edu",
            'contact_email': "admin@iitblr.example.edu",
            'is_verified': True,
            'total_students_enrolled': 4500,
            'placement_rate': 92.4,
        }
    )

    # 8. Seed Assessments & Questions
    from apps.assessments.models import Assessment, AssessmentQuestion, AssessmentAttempt
    assessment, _ = Assessment.objects.get_or_create(
        title="Python Backend & Systems Engineering Evaluation",
        defaults={
            'description': "Comprehensive assessment covering Python fundamentals, OOP, concurrency, and web APIs.",
            'assessment_type': "TECHNICAL",
            'duration_minutes': 45,
            'total_marks': 100,
            'passing_score': 70,
        }
    )
    assessment.skills_assessed.set([skill_instances["Python"], skill_instances["Django"]])

    q1, _ = AssessmentQuestion.objects.get_or_create(
        assessment=assessment,
        question_text="What is the primary difference between a process and a thread in Python with respect to the GIL?",
        defaults={
            'question_type': 'MCQ',
            'options': [
                "Threads share memory and GIL allows only one thread to execute Python bytecode at a time",
                "Processes share memory while threads do not",
                "GIL completely prevents multi-process execution",
                "Threads run on separate CPU cores concurrently without restrictions"
            ],
            'correct_answer': "Threads share memory and GIL allows only one thread to execute Python bytecode at a time",
            'points': 50,
            'order': 1
        }
    )
    q2, _ = AssessmentQuestion.objects.get_or_create(
        assessment=assessment,
        question_text="Which Django query optimization prevents the N+1 queries problem for ForeignKey relationships?",
        defaults={
            'question_type': 'MCQ',
            'options': [
                "select_related()",
                "prefetch_related()",
                "filter_related()",
                "join_related()"
            ],
            'correct_answer': "select_related()",
            'points': 50,
            'order': 2
        }
    )

    # 9. Seed Career Readiness Score & Action Plan
    from apps.career.models import CareerReadinessScore, ActionPlan, CareerPath
    readiness, _ = CareerReadinessScore.objects.get_or_create(
        student=student_profile,
        defaults={
            'overall_score': 82,
            'technical_score': 88,
            'soft_skill_score': 75,
            'project_score': 80,
            'certification_score': 85,
            'experience_score': 78,
            'explanation': "High proficiency in Python and backend design. Recommend deepening cloud deployment skills."
        }
    )

    action_plan, _ = ActionPlan.objects.get_or_create(
        student=student_profile,
        target_role="Senior Backend Engineer",
        defaults={
            'skill_gap': "Cloud & Kubernetes Orchestration",
            'priority': "HIGH",
            'steps': [
                {"week": 1, "title": "Docker & Containerization", "status": "COMPLETED"},
                {"week": 4, "title": "Microservices Architecture & FastAPI", "status": "IN_PROGRESS"},
                {"week": 8, "title": "Kubernetes & Production Orchestration", "status": "PENDING"},
                {"week": 12, "title": "System Design & Distributed Caching", "status": "PENDING"}
            ]
        }
    )

    # 10. Seed Learning Resources & Industry Training
    from apps.learning.models import LearningResource, IndustryTraining, UserLearningProgress
    learning_res, _ = LearningResource.objects.get_or_create(
        title="Production Docker & Kubernetes Mastery",
        defaults={
            'provider': "Industry Engineering Academy",
            'type': "COURSE",
            'url': "https://learn.portal.example.com/docker-k8s",
            'duration_hours': 14,
            'difficulty': "INTERMEDIATE",
            'rating': 4.9
        }
    )
    learning_res.skills_targeted.set([skill_instances["Docker"]])

    training, _ = IndustryTraining.objects.get_or_create(
        title="Enterprise Cloud Architecture & Distributed Systems",
        industry=industry_profile,
        defaults={
            'description': "8-week intensive virtual workshop led by TechCorp engineering leaders.",
            'duration_weeks': 8,
            'max_participants': 40,
            'mode': "ONLINE",
            'is_active': True
        }
    )

    # 11. Seed Certifications
    from apps.certifications.models import Certification
    cert, _ = Certification.objects.get_or_create(
        student=student_profile,
        title="Certified Python Web Solutions Architect",
        defaults={
            'issuing_organization': "Python Software Foundation & Academy",
            'issue_date': "2026-01-15",
            'credential_id': "PSF-ARCH-98231",
            'credential_url': "https://certs.psf.org/verify/98231",
            'verification_status': "VERIFIED"
        }
    )

    # 12. Seed Live Projects & Micro-Internships
    from apps.projects.models import Project
    from apps.micro_internships.models import MicroInternship
    proj, _ = Project.objects.get_or_create(
        student=student_profile,
        title="Distributed Task Queue & Real-Time Notification Engine",
        defaults={
            'description': "Engineered an asynchronous Celery-backed distributed task system processing 5,000 requests/sec.",
            'project_type': "INDUSTRY_LIVE",
            'skills_used': ["Python", "FastAPI", "Redis", "Docker", "PostgreSQL"],
            'repo_url': "https://github.com/demo-student/task-queue",
            'is_verified': True
        }
    )

    micro, _ = MicroInternship.objects.get_or_create(
        title="RAG Knowledge Base & Vector Indexing Sprint",
        industry=industry_profile,
        defaults={
            'problem_statement': "Implement vector similarity search and RAG retrieval pipelines using pgvector.",
            'deliverables': ["Clean embeddings pipeline", "Benchmark retrieval precision"],
            'duration_days': 21,
            'stipend': "INR 20,000",
            'status': "OPEN"
        }
    )
    micro.required_skills.set([skill_instances["Python"], skill_instances["Machine Learning"]])

    # 13. Seed Mentorship
    from apps.mentorship.models import MentorshipProfile, MentorshipSession
    from django.utils import timezone
    mentor, _ = MentorshipProfile.objects.get_or_create(
        user=academic_user,
        defaults={
            'expertise': ["Research Strategy", "Distributed Systems", "Career Guidance"],
            'company_or_institution': "Indian Institute of Technology",
            'designation': "Professor",
            'bio': "Passionate about mentoring the next generation of software engineers and researchers."
        }
    )

    session, _ = MentorshipSession.objects.get_or_create(
        mentor=academic_user,
        mentee=student_user,
        defaults={
            'topic': "Transitioning from University Projects to Enterprise Systems",
            'scheduled_at': timezone.now() + timezone.timedelta(days=7),
            'status': "SCHEDULED"
        }
    )

    # 14. Seed Skill Passport & Digital Portfolio
    from apps.skill_passports.models import SkillPassport
    from apps.portfolios.models import DigitalPortfolio
    passport, _ = SkillPassport.objects.get_or_create(
        student=student_profile,
        defaults={
            'passport_number': "SP-AARAV-2026",
            'cryptographic_signature': "f82b79a8e947d10e056d68b8ff7174e92b3a992a543810f601b0f90e0c8b0789",
            'verified_credentials_snapshot': [
                {"name": "Python", "proficiency": "ADVANCED", "score": 85},
                {"name": "React", "proficiency": "INTERMEDIATE", "score": 75}
            ],
            'is_valid': True
        }
    )

    portfolio, _ = DigitalPortfolio.objects.get_or_create(
        student=student_profile,
        defaults={
            'username': "aarav-sharma",
            'is_public': True,
            'custom_theme': "dark",
            'views_count': 342,
            'achievements': ["Winner of National Smart India Hackathon", "Top 5% on Skill Profiler"]
        }
    )

    # 15. Seed Gamification & Notifications
    from apps.gamification.models import Badge, UserGamification
    from apps.notifications.models import Notification

    badge1, _ = Badge.objects.get_or_create(
        name="Python Guru",
        defaults={
            'slug': "python-guru",
            'description': "Scored > 80% on the Python Engineering Assessment.",
            'icon': "award",
            'points_reward': 100
        }
    )
    user_game, _ = UserGamification.objects.get_or_create(
        user=student_user,
        defaults={
            'total_points': 450,
            'streak_days': 12
        }
    )
    user_game.badges.add(badge1)

    Notification.objects.get_or_create(
        user=student_user,
        title="Application Shortlisted!",
        defaults={
            'message': "TechCorp Global Solutions has shortlisted your application for Full Stack Intern.",
            'type': "APPLICATION_UPDATE",
            'channel': "IN_APP",
            'is_read': False
        }
    )

    # 16. Seed SuperAdmin
    if not User.objects.filter(email="admin@acadindportal.org").exists():
        User.objects.create_superuser(
            email="admin@acadindportal.org",
            password="AdminPassword123!",
            first_name="System",
            last_name="Administrator"
        )
        print("  + Created Superuser: admin@acadindportal.org / AdminPassword123!")

    print("\n[SUCCESS] Comprehensive database seed completed successfully!")
    print("----------------------------------------------------------------")
    print("Demo Credentials:")
    print("  Student:      student@example.com       | Password: Password123!")
    print("  Industry:     recruiter@techcorp.com    | Password: Password123!")
    print("  Academician:  professor@university.edu  | Password: Password123!")
    print("  Institution:  principal@iit.edu         | Password: Password123!")
    print("  Superadmin:   admin@acadindportal.org   | Password: AdminPassword123!")
    print("----------------------------------------------------------------")

if __name__ == '__main__':
    seed()

