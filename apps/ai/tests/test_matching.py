import sys
import os
import unittest

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.services.opportunity_matching.scoring import compute_match_score
from app.services.opportunity_matching.service import OpportunityMatchingService
from app.schemas.requests import OpportunityMatchRequest

class TestOpportunityMatching(unittest.TestCase):
    def test_compute_match_score_high_fit(self):
        user_skills = ["Python", "FastAPI", "PostgreSQL", "Docker", "Git", "Kubernetes"]
        req_skills = ["Python", "FastAPI", "PostgreSQL", "Docker"]
        pref_skills = ["Kubernetes", "Redis"]

        res = compute_match_score(
            user_skills=user_skills,
            required_skills=req_skills,
            preferred_skills=pref_skills,
            experience_years=2.0,
            assessment_score=88.0,
            project_count=3,
            cert_count=1
        )
        self.assertGreaterEqual(res["match_percentage"], 80.0)
        self.assertTrue(res["eligibility"])
        self.assertEqual(len(res["missing_skills"]), 0)

    def test_compute_match_score_low_fit(self):
        user_skills = ["HTML", "CSS"]
        req_skills = ["Python", "PostgreSQL", "Docker", "Kubernetes"]

        res = compute_match_score(
            user_skills=user_skills,
            required_skills=req_skills,
            experience_years=0.0
        )
        self.assertLess(res["match_percentage"], 55.0)
        self.assertFalse(res["eligibility"])
        self.assertGreater(len(res["missing_skills"]), 2)

    def test_matching_service_integration(self):
        payload = OpportunityMatchRequest(
            opportunity_id="opp-1234",
            user_id="usr-abc",
            user_skills=["Python", "PostgreSQL", "React.js"],
            required_skills=["Python", "PostgreSQL"],
            experience_years=1.5
        )
        match_res = OpportunityMatchingService.match(payload)
        self.assertGreaterEqual(match_res.match_percentage, 70.0)
        self.assertTrue(match_res.eligibility)
        self.assertIn("Python", match_res.matching_skills)

if __name__ == '__main__':
    unittest.main()
