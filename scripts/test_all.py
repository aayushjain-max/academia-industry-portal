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
    print("[TEST] Running Backend End-to-End Functional Tests")
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
    import time
    test_email = f"student_{int(time.time())}@college.edu"
    print(f"\n[Test 4] Testing new student registration ({test_email})...")
    client.credentials()  # Clear auth
    res = client.post('/api/v1/auth/register/', {
        'email': test_email,
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

    # 9. Test Assessment and Grading Engine
    print("\n[Test 9] Testing Assessment listing and Auto-Grading Engine (/api/v1/assessments/)...")
    client.credentials(HTTP_AUTHORIZATION=f'Bearer {student_token}')
    res = client.get('/api/v1/assessments/')
    assert res.status_code == 200, f"Assessments failed: {res.data}"
    assert res.data['count'] >= 1
    assessment_id = res.data['results'][0]['id']

    # Get questions
    res = client.get(f'/api/v1/assessments/{assessment_id}/questions/')
    assert res.status_code == 200
    questions = res.data
    assert len(questions) >= 2
    q1_id = questions[0]['id']
    q2_id = questions[1]['id']

    # Submit answers
    res = client.post(f'/api/v1/assessments/{assessment_id}/submit/', {
        'answers': {
            q1_id: "Threads share memory and GIL allows only one thread to execute Python bytecode at a time",
            q2_id: "select_related()"
        }
    }, format='json')
    assert res.status_code == 200, f"Assessment submit failed: {res.data}"
    assert res.data['percentage'] == 100.0
    assert res.data['passed'] is True
    print(f"  -> Success! Auto-grading completed: score {res.data['score']}, percentage: {res.data['percentage']}%, passed: {res.data['passed']}")

    # 10. Test AI Skill Profiling & Refresh
    print("\n[Test 10] Testing Skill Profile AI Generation (/api/v1/skill-profiles/my_profile/)...")
    res = client.get('/api/v1/skill-profiles/my_profile/')
    assert res.status_code == 200, f"Skill profile failed: {res.data}"
    assert res.data['overall_score'] > 0
    print(f"  -> Success! Student AI Skill Profile: overall score {res.data['overall_score']}, strengths: {len(res.data.get('strengths', []))}")

    # 11. Test Skill Gap Analysis
    print("\n[Test 11] Testing Skill Gap Analysis (/api/v1/skill-gaps/analyze/)...")
    res = client.post('/api/v1/skill-gaps/analyze/', {
        'target_role': 'Backend Engineer',
    }, format='json')
    assert res.status_code == 201, f"Skill gap analysis failed: {res.data}"
    assert res.data['readiness_percentage'] >= 0
    print(f"  -> Success! Gap analysis for '{res.data['target_role']}': readiness {res.data['readiness_percentage']}%, missing: {len(res.data.get('missing_skills', []))}")

    # 12. Test Career Readiness & Action Plan
    print("\n[Test 12] Testing Career Readiness Score and Action Plan...")
    res = client.get('/api/v1/career/readiness/')
    assert res.status_code == 200, f"Career readiness failed: {res.data}"
    assert res.data['overallScore'] >= 80
    print(f"  -> Success! Career readiness overall score: {res.data['overallScore']}%")

    res = client.get('/api/v1/career/action-plan/')
    assert res.status_code == 200, f"Action plan failed: {res.data}"
    print(f"  -> Success! Action plan retrieved: {res.data['targetRole']} ({len(res.data.get('steps', []))} milestones)")

    # 13. Test AI Opportunity Matching
    print("\n[Test 13] Testing AI Candidate Match Engine (/api/v1/opportunities/{id}/match/)...")
    res = client.get(f'/api/v1/opportunities/{opp_id}/match/')
    assert res.status_code == 200, f"Opportunity matching failed: {res.data}"
    assert 'matchPercentage' in res.data
    print(f"  -> Success! Candidate Match: {res.data['matchPercentage']}% match for '{opp_title}', eligible: {res.data['eligibility']}")

    # 14. Test Learning Resources & Industry Training
    print("\n[Test 14] Testing Learning Resources & Industry Training...")
    res = client.get('/api/v1/learning/')
    assert res.status_code == 200
    assert res.data['count'] >= 1
    print(f"  -> Success! Available learning resources: {res.data['count']}")

    res = client.get('/api/v1/learning/trainings/')
    assert res.status_code == 200
    print(f"  -> Success! Industry training modules: {len(res.data)}")

    # 15. Test Projects & Micro-Internships
    print("\n[Test 15] Testing Live Projects and Micro-Internships...")
    res = client.get('/api/v1/projects/')
    assert res.status_code == 200
    assert res.data['count'] >= 1
    print(f"  -> Success! Student projects found: {res.data['count']}")

    res = client.get('/api/v1/micro-internships/')
    assert res.status_code == 200
    assert res.data['count'] >= 1
    print(f"  -> Success! Micro-internships active: {res.data['count']}")

    # 16. Test Mentorship Portal
    print("\n[Test 16] Testing Mentorship Profiles & Sessions...")
    res = client.get('/api/v1/mentorship/')
    assert res.status_code == 200
    assert res.data['count'] >= 1
    print(f"  -> Success! Verified mentors available: {res.data['count']}")

    # 17. Test Digital Skill Passport with Cryptographic Verification
    print("\n[Test 17] Testing Digital Skill Passport & QR verification...")
    res = client.get('/api/v1/skill-passports/my_passport/')
    assert res.status_code == 200, f"Passport fetch failed: {res.data}"
    sig = res.data['cryptographic_signature']
    passport_num = res.data['passport_number']
    print(f"  -> Success! Issued Passport: {passport_num} with SHA-256 sig: {sig[:16]}...")

    # Public verification
    client.credentials()  # Unauthenticated public verifier
    res = client.get(f'/api/v1/skill-passports/verify/{sig}/')
    assert res.status_code == 200, f"Passport verify failed: {res.data}"
    assert res.data['valid'] is True
    print(f"  -> Success! Public cryptographic verification validated passport validity: {res.data['valid']}")

    # 18. Test Public Digital Portfolio
    print("\n[Test 18] Testing Public Digital Portfolio (/api/v1/portfolios/public/aarav-sharma/)...")
    res = client.get('/api/v1/portfolios/public/aarav-sharma/')
    assert res.status_code == 200, f"Public portfolio failed: {res.data}"
    assert res.data['fullName'] == 'Aarav Sharma'
    print(f"  -> Success! Public portfolio retrieved for {res.data['fullName']} ({res.data['location']})")

    # 19. Test Gamification Leaderboard
    print("\n[Test 19] Testing Gamification & Leaderboard (/api/v1/gamification/leaderboard/)...")
    client.credentials(HTTP_AUTHORIZATION=f'Bearer {student_token}')
    res = client.get('/api/v1/gamification/leaderboard/')
    assert res.status_code == 200, f"Leaderboard failed: {res.data}"
    leaderboard = res.data.get('results', res.data) if isinstance(res.data, dict) else res.data
    assert len(leaderboard) >= 1
    top_user = leaderboard[0]
    print(f"  -> Success! Leaderboard ranked {len(leaderboard)} entries. Top: {top_user.get('user_name') or top_user.get('user_email')} ({top_user.get('total_points')} pts)")

    # 20. Test Analytics Endpoints (Heatmap & Institutional Overview)
    print("\n[Test 20] Testing Skill Demand Heatmap & Institutional Overview...")
    res = client.get('/api/v1/analytics/skill-demand-heatmap/')
    assert res.status_code == 200, f"Heatmap failed: {res.data}"
    assert len(res.data) >= 3
    print(f"  -> Success! Skill Demand Heatmap loaded {len(res.data)} regions/domains.")

    res = client.get('/api/v1/analytics/institution-overview/')
    assert res.status_code == 200, f"Institution overview failed: {res.data}"
    assert res.data['totalStudents'] > 0
    print(f"  -> Success! Institution Overview: {res.data['totalStudents']} students, {res.data['placementRate']}% placement rate.")

    # 21. Test Notifications & Multilingual Preferences
    print("\n[Test 21] Testing Notifications and User Preferences...")
    res = client.get('/api/v1/notifications/')
    assert res.status_code == 200
    notifs = res.data.get('results', res.data) if isinstance(res.data, dict) else res.data
    assert len(notifs) >= 1
    notif_id = notifs[0]['id']
    print(f"  -> Success! Received {len(notifs)} notifications. Title: '{notifs[0]['title']}'")

    res = client.post(f'/api/v1/notifications/{notif_id}/read/')
    assert res.status_code == 200
    print("  -> Success! Notification marked as read.")

    res = client.get('/api/v1/auth/languages/')
    assert res.status_code == 200
    langs = res.data.get('languages', res.data)
    print(f"  -> Success! Supported multilingual languages: {[l['name'] for l in langs[:4]]}...")

    # 22. Test Unified Global Search
    print("\n[Test 22] Testing Unified Global Search (/api/v1/search/?q=Python)...")
    res = client.get('/api/v1/search/?q=Python')
    assert res.status_code == 200, f"Global search failed: {res.data}"
    assert res.data['total'] >= 1
    print(f"  -> Success! Unified search matched {res.data['total']} entities across opportunities, skills, students, projects.")

    print("\n================================================================================")
    print("[SUCCESS] ALL 22 EXTENSIVE END-TO-END FEATURE AND PERSONA TESTS PASSED PERFECTLY!")
    print("================================================================================")

if __name__ == '__main__':
    run_tests()
