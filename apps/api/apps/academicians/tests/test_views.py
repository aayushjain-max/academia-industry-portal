import uuid
from decimal import Decimal
from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from apps.academicians.models import (
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
from apps.skills.models import Skill, StudentSkill
from apps.career.models import CareerReadinessScore
from common.constants.roles import UserRole

User = get_user_model()


class AcademicianPortalTests(TestCase):
    def setUp(self):
        self.client = APIClient()

        # Create Primary Academician User
        self.user = User.objects.create_user(
            email='faculty1@university.edu',
            password='Password123!',
            first_name='Aarav',
            last_name='Nambiar',
            role=UserRole.ACADEMICIAN
        )
        self.profile = AcademicianProfile.objects.create(
            user=self.user,
            institution_name='National Institute of Technology',
            department='Computer Science & Engineering',
            designation='Associate Professor',
            experience_years=12,
            is_verified=True
        )

        # Create Secondary Academician User for permission testing
        self.other_user = User.objects.create_user(
            email='faculty2@university.edu',
            password='Password123!',
            first_name='Priya',
            last_name='Menon',
            role=UserRole.ACADEMICIAN
        )
        self.other_profile = AcademicianProfile.objects.create(
            user=self.other_user,
            institution_name='National Institute of Technology',
            department='Computer Science & Engineering',
            designation='Assistant Professor'
        )

        # Create Student User & Profile
        self.student_user = User.objects.create_user(
            email='student1@university.edu',
            password='Password123!',
            first_name='Rohan',
            last_name='Gupta',
            role=UserRole.STUDENT
        )
        self.student_profile = StudentProfile.objects.create(
            user=self.student_user,
            institution_name='National Institute of Technology',
            department='Computer Science & Engineering',
            year_of_study=4,
            degree='B.Tech CSE',
            cgpa=Decimal('8.90')
        )
        self.readiness_score = CareerReadinessScore.objects.create(
            student=self.student_profile,
            overall_score=85,
            technical_score=90
        )

        # Create Skill
        self.skill = Skill.objects.create(name='Distributed Systems', category='Backend Architecture')
        StudentSkill.objects.create(student=self.student_profile, skill=self.skill, proficiency='ADVANCED')

        # Authenticate as primary academician
        self.client.force_authenticate(user=self.user)

    def test_get_my_profile(self):
        res = self.client.get('/api/v1/academicians/me/')
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data['email'], 'faculty1@university.edu')
        self.assertEqual(res.data['department'], 'Computer Science & Engineering')

    def test_update_my_profile(self):
        res = self.client.patch('/api/v1/academicians/me/', {
            'bio': 'Pioneering research in cloud virtualization.',
            'orcid': '0000-0002-1234-5678'
        })
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.profile.refresh_from_db()
        self.assertEqual(self.profile.bio, 'Pioneering research in cloud virtualization.')
        self.assertEqual(self.profile.orcid, '0000-0002-1234-5678')

    def test_dashboard_aggregation(self):
        # Create a publication and a research project
        Publication.objects.create(
            academician=self.profile,
            title='Consensus Algorithms in Edge Nodes',
            journal='IEEE Transactions',
            citation_count=45
        )
        ResearchProject.objects.create(
            academician=self.profile,
            title='Autonomous Edge Compute Pods',
            funding_amount=Decimal('2500000.00'),
            status='ACTIVE'
        )

        res = self.client.get('/api/v1/academicians/dashboard/')
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        metrics = res.data['scholastic_metrics']
        self.assertEqual(metrics['total_publications'], 1)
        self.assertEqual(metrics['total_citations'], 45)
        self.assertEqual(metrics['active_research_projects'], 1)
        self.assertEqual(metrics['total_research_funding'], 2500000.0)

    def test_publication_crud_and_isolation(self):
        # Create publication
        res = self.client.post('/api/v1/academicians/publications/', {
            'title': 'High-Throughput Raft Over RDMA',
            'journal': 'ACM SIGMOD',
            'publication_type': 'JOURNAL',
            'doi': '10.1145/1234567',
            'indexing': 'SCOPUS'
        })
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        pub_id = res.data['id']

        # Ensure user can list it
        list_res = self.client.get('/api/v1/academicians/publications/')
        self.assertEqual(list_res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(list_res.data['results']), 1)

        # Switch user: other academician should not see it in their own list
        self.client.force_authenticate(user=self.other_user)
        other_list = self.client.get('/api/v1/academicians/publications/')
        self.assertEqual(len(other_list.data['results']), 0)

        # Other user cannot modify it
        patch_res = self.client.patch(f'/api/v1/academicians/publications/{pub_id}/', {'title': 'Hacked Title'})
        self.assertIn(patch_res.status_code, [status.HTTP_403_FORBIDDEN, status.HTTP_404_NOT_FOUND])

    def test_patent_crud(self):
        res = self.client.post('/api/v1/academicians/patents/', {
            'title': 'Hardware Neural Acceleration Coprocessor',
            'patent_number': 'IN-2024-99881',
            'status': 'FILED',
            'jurisdiction': 'India (IPO)'
        })
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Patent.objects.filter(academician=self.profile).count(), 1)

    def test_research_project_with_milestones(self):
        res = self.client.post('/api/v1/academicians/research-projects/', {
            'title': 'Quantum Key Distribution Testbed',
            'funding_amount': 4500000,
            'funding_agency': 'DST',
            'status': 'ACTIVE',
            'milestones': [
                {'title': 'RTL Architecture Spec', 'progress_percentage': 100, 'status': 'COMPLETED'},
                {'title': 'FPGA Synthesis & Hardware Test', 'progress_percentage': 40, 'status': 'IN_PROGRESS'}
            ]
        }, format='json')
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        proj_id = res.data['id']
        project = ResearchProject.objects.get(id=proj_id)
        self.assertEqual(project.milestones.count(), 2)

    def test_grant_opportunities_and_applications(self):
        grant = GrantOpportunity.objects.create(
            title='Aerospace Autonomous Telemetry RFP',
            funding_agency='ISRO',
            total_funding=Decimal('5000000.00'),
            duration_months=36
        )

        res = self.client.get('/api/v1/academicians/grant-opportunities/')
        self.assertEqual(res.status_code, status.HTTP_200_OK)

        # Apply for grant
        app_res = self.client.post('/api/v1/academicians/grant-applications/', {
            'grant_opportunity_id': str(grant.id),
            'project_title': 'Deep-Space Telemetry Robustness',
            'requested_amount': 4800000,
            'executive_summary': 'Proposal for fault-tolerant telemetry under radiation.'
        })
        self.assertEqual(app_res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(GrantApplication.objects.filter(academician=self.profile).count(), 1)

    def test_fdp_workshop_registrations(self):
        fdp = FDPProgram.objects.create(
            title='AICTE ATAL FDP on Cloud Architecture',
            organizer='AICTE',
            mode='ONLINE',
            duration_days=5
        )
        workshop = Workshop.objects.create(
            title='Microservices & Kubernetes Boot Camp',
            organizer='Linux Foundation',
            capacity=100
        )

        reg_fdp = self.client.post(f'/api/v1/academicians/fdp-programs/{fdp.id}/register/')
        self.assertEqual(reg_fdp.status_code, status.HTTP_201_CREATED)
        self.assertEqual(FDPRegistration.objects.filter(academician=self.profile).count(), 1)

        reg_ws = self.client.post(f'/api/v1/academicians/workshops/{workshop.id}/register/')
        self.assertEqual(reg_ws.status_code, status.HTTP_201_CREATED)
        self.assertEqual(WorkshopRegistration.objects.filter(academician=self.profile).count(), 1)

    def test_department_students_query(self):
        res = self.client.get('/api/v1/academicians/students/')
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertTrue(len(res.data) >= 1)
        student = res.data[0]
        self.assertEqual(student['email'], 'student1@university.edu')
        self.assertEqual(student['readiness_category'], 'INDUSTRY_READY')

    def test_faculty_impact_score(self):
        res = self.client.get('/api/v1/academicians/faculty_impact/')
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertIn('total_impact_score', res.data)
        self.assertIn('breakdown', res.data)
