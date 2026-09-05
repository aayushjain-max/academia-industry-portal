#!/usr/bin/env python
import os
import sys
import json
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BASE_DIR / 'apps' / 'api'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.development')

import django
django.setup()

from rest_framework.test import APIClient

def run_tests():
    client = APIClient()
    print("==================================================")
    print("🧪 Running Backend End-to-End Functional Tests")
    print("==================================================")

    # 1. Test Login with Demo Student
    print("\n[Test 1] Logging in as demo student (student@example.com)...")
    res = client.post('/api/v1/auth/login/', {
        'email': 'student@example.com',
        'password': 'Password123!'
    }, format='json')
    assert res.status_code == 200, f"Login failed: {res.data}"
    student_token = res.data['access']
    print(f"  -> Success! Received JWT access token. User: {res.data['user']['email']}, Role: {res.data['user']['role']}")

    # 2. Test /api/v1/auth/me/
    print("\n[Test 2] Testing /api/v1/auth/me/ with Bearer token...")
    client.credentials(HTTP_AUTHORIZATION=f'Bearer {student_token}')
    res = client.get('/api/v1/auth/me/')
    assert res.status_code == 200, f"/auth/me/ failed: {res.data}"
    assert res.data['student_profile'] is not None
    print(f"  -> Success! Profile institution: {res.data['student_profile']['institution_name']}, CGPA: {res.data['student_profile']['cgpa']}")

    # 3. Test Student's Skills Endpoint
    print("\n[Test 3] Testing /api/v1/skills/my-skills/...")
    res = client.get('/api/v1/skills/my-skills/')
    assert res.status_code == 200, f"my-skills failed: {res.data}"
    print(f"  -> Success! Student has {res.data['count']} skills associated.")

    # 4. Test Registration of a New User
    print("\n[Test 4] Testing new student registration (/api/v1/auth/register/)...")
    client.credentials()  # Clear auth
    res = client.post('/api/v1/auth/register/', {
        'email': 'newstudent@college.edu',
        'password': 'StrongPassword2026!',
        'first_name': 'Rohan',
        'last_name': 'Gupta',
        'role': 'STUDENT',
        'institution_name': 'Delhi Technological University',
        'degree': 'B.Tech Information Technology'
    }, format='json')
    assert res.status_code == 201, f"Registration failed: {res.data}"
    new_user_token = res.data['access']
    print(f"  -> Success! Registered new student: {res.data['user']['email']} with auto-provisioned student profile.")

    # 5. Test Opportunity Listing
    print("\n[Test 5] Browsing opportunities (/api/v1/opportunities/)...")
    client.credentials(HTTP_AUTHORIZATION=f'Bearer {new_user_token}')
    res = client.get('/api/v1/opportunities/')
    assert res.status_code == 200, f"Opportunities listing failed: {res.data}"
    assert res.data['count'] >= 2
    opp_id = res.data['results'][0]['id']
    opp_title = res.data['results'][0]['title']
    print(f"  -> Success! Found {res.data['count']} active opportunities. First: '{opp_title}'")

    # 6. Test Applying to an Opportunity
    print(f"\n[Test 6] Applying to opportunity '{opp_title}' as new student...")
    res = client.post('/api/v1/applications/', {
        'opportunity': opp_id,
        'cover_letter': 'I am eager to contribute to this role with my IT background.',
        'resume_url': 'https://drive.google.com/demo-resume'
    }, format='json')
    assert res.status_code == 201, f"Application submission failed: {res.data}"
    app_id = res.data['id']
    print(f"  -> Success! Application created (ID: {app_id}, Status: {res.data['status_display']}).")

    # 7. Test Industry User Reviewing the Application
    print("\n[Test 7] Logging in as Recruiter to review the application...")
    client.credentials()
    res = client.post('/api/v1/auth/login/', {
        'email': 'recruiter@techcorp.com',
        'password': 'Password123!'
    }, format='json')
    assert res.status_code == 200
    recruiter_token = res.data['access']

    client.credentials(HTTP_AUTHORIZATION=f'Bearer {recruiter_token}')
    res = client.get('/api/v1/applications/')
    assert res.status_code == 200, f"Recruiter applications view failed: {res.data}"
    print(f"  -> Success! Recruiter sees {res.data['count']} applications across TechCorp opportunities.")

    # Update application status
    print(f"\n[Test 8] Updating application {app_id} status to 'UNDER_REVIEW'...")
    res = client.patch(f'/api/v1/applications/{app_id}/', {
        'status': 'UNDER_REVIEW',
        'feedback': 'Resume matches initial qualifications. Portfolio review underway.'
    }, format='json')
    assert res.status_code == 200, f"Application update failed: {res.data}"
    assert res.data['status'] == 'UNDER_REVIEW'
    print(f"  -> Success! Status updated to {res.data['status']} with recruiter feedback.")

    print("\n==================================================")
    print("ALL 8 END-TO-END TESTS PASSED PERFECTLY!")
    print("==================================================")

if __name__ == '__main__':
    run_tests()
