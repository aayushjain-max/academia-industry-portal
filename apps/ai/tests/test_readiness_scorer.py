import sys
import os
import unittest

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.services.career_guidance.readiness_scorer import calculate_readiness_score
from app.services.career_guidance.service import CareerGuidanceService

class TestCareerReadinessScorer(unittest.TestCase):
    def test_calculate_readiness_score_high_performer(self):
        profile = {
            "skills": [
                {"name": "Python", "score": 95, "proficiency": "EXPERT"},
                {"name": "PostgreSQL", "score": 90, "proficiency": "EXPERT"},
                {"name": "Docker", "score": 85, "proficiency": "ADVANCED"},
            ],
            "assessments": [{"score": 92}, {"score": 88}],
            "projects": [{"name": "Microservice App"}, {"name": "Auth Service"}],
            "certifications": [{"name": "AWS Certified Developer"}],
            "experience_months": 12,
            "soft_skills_score": 85.0,
            "career_alignment_score": 90.0
        }
        res = calculate_readiness_score(profile)
        self.assertGreaterEqual(res["overall_score"], 80)
        self.assertIn("TIER 01", res["tier"])
        self.assertIn("technical_competency", res["component_scores"])

    def test_calculate_readiness_score_foundational(self):
        profile = {
            "skills": [],
            "assessments": [],
            "projects": [],
            "certifications": [],
            "experience_months": 0,
            "soft_skills_score": 60.0,
            "career_alignment_score": 60.0
        }
        res = calculate_readiness_score(profile)
        self.assertLess(res["overall_score"], 60)
        self.assertIn("TIER 04", res["tier"])

    def test_career_guidance_recommendations(self):
        recs = CareerGuidanceService.get_career_recommendations(
            user_id="usr-1",
            skills=["python", "fastapi", "postgresql", "docker"]
        )
        self.assertTrue(len(recs["recommended_tracks"]) > 0)
        top_track = recs["recommended_tracks"][0]
        self.assertIn("match_score", top_track)
        self.assertGreaterEqual(top_track["match_score"], 50)

if __name__ == '__main__':
    unittest.main()
