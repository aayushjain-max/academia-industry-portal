from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth import get_user_model
from apps.students.models import StudentProfile
from apps.industries.models import IndustryProfile
from apps.academicians.models import AcademicianProfile
from apps.projects.models import Project
from apps.certifications.models import Certification
from common.constants.roles import UserRole

User = get_user_model()

class SecurityRBACIntegrationTest(TestCase):
    def setUp(self):
        self.client = APIClient()

        # Create Student User
        self.student_user = User.objects.create_user(
            email='student@test.com',
            password='password123',
            role=UserRole.STUDENT,
            first_name='Student',
            last_name='User'
        )
        self.student_profile = StudentProfile.objects.create(
            user=self.student_user,
            roll_number='STU001',
            department='Computer Science'
        )


        # Create Industry User
        self.industry_user = User.objects.create_user(
            email='industry@test.com',
            password='password123',
            role=UserRole.INDUSTRY,
            first_name='Recruiter',
            last_name='Corp'
        )
        self.industry_profile = IndustryProfile.objects.create(
            user=self.industry_user,
            company_name='TechCorp Global',
            industry_sector='IT'
        )

        # Create Academician User
        self.academician_user = User.objects.create_user(
            email='faculty@test.com',
            password='password123',
            role=UserRole.ACADEMICIAN,
            first_name='Dr.',
            last_name='Professor'
        )
        self.academician_profile = AcademicianProfile.objects.create(
            user=self.academician_user,
            institution_name='National University',
            department='CSE'
        )


    def test_student_cannot_create_opportunity(self):
        self.client.force_authenticate(user=self.student_user)
        response = self.client.post('/api/v1/opportunities/', {
            'title': 'Fake Junior Developer',
            'description': 'Bogus job posting by student',
            'location': 'Remote',
            'opportunity_type': 'JOB'
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        # Verify no fake IndustryProfile was created
        self.assertFalse(IndustryProfile.objects.filter(user=self.student_user).exists())

    def test_industry_can_create_opportunity(self):
        self.client.force_authenticate(user=self.industry_user)
        response = self.client.post('/api/v1/opportunities/', {
            'title': 'Junior Python Developer',
            'description': 'Real job posting by industry',
            'location': 'Bangalore',
            'opportunity_type': 'JOB'
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_student_cannot_self_verify_project(self):
        project = Project.objects.create(
            student=self.student_profile,
            title='Autonomous Drone Navigation',
            description='AI pathfinding algorithm',
            is_verified=False
        )
        self.client.force_authenticate(user=self.student_user)
        response = self.client.post(f'/api/v1/projects/{project.id}/verify/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        project.refresh_from_db()
        self.assertFalse(project.is_verified)

    def test_academician_can_verify_project(self):
        project = Project.objects.create(
            student=self.student_profile,
            title='Solar Power Grid Tracker',
            description='IoT energy tracking',
            is_verified=False
        )
        self.client.force_authenticate(user=self.academician_user)
        response = self.client.post(f'/api/v1/projects/{project.id}/verify/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project.refresh_from_db()
        self.assertTrue(project.is_verified)

    def test_student_cannot_self_verify_certification(self):
        cert = Certification.objects.create(
            student=self.student_profile,
            title='AWS Solutions Architect',
            issuing_organization='Amazon Web Services',
            issue_date='2026-01-01',
            verification_status='PENDING'
        )
        self.client.force_authenticate(user=self.student_user)
        response = self.client.post(f'/api/v1/certifications/{cert.id}/verify/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        cert.refresh_from_db()
        self.assertEqual(cert.verification_status, 'PENDING')


    def test_anonymous_verification_request_handled_cleanly(self):
        response = self.client.post('/api/v1/verification/', {
            'record_type': 'CERTIFICATE',
            'metadata': {'credential': 'ABC'}
        }, format='json')
        self.assertIn(response.status_code, [status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN])

    def test_academician_missing_target_user_verification_returns_400(self):
        self.client.force_authenticate(user=self.academician_user)
        response = self.client.post('/api/v1/verification/', {
            'user_id': '00000000-0000-0000-0000-000000000000',
            'record_type': 'CERTIFICATE',
            'metadata': {'credential': 'ABC'}
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
