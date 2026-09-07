import sys
import os
import unittest

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.services.skill_profiling.normalizer import normalize_skill_name
from app.services.skill_profiling.extractor import extract_assessment_skills
from app.services.skill_profiling.service import SkillProfilingService
from app.schemas.requests import AssessmentSubmission

class TestSkillProfiling(unittest.TestCase):
    def test_skill_normalization(self):
        self.assertEqual(normalize_skill_name("react.js"), "React.js")
        self.assertEqual(normalize_skill_name("React JS"), "React.js")
        self.assertEqual(normalize_skill_name("reactjs"), "React.js")
        self.assertEqual(normalize_skill_name("python3"), "Python")
        self.assertEqual(normalize_skill_name("py"), "Python")
        self.assertEqual(normalize_skill_name("docker container"), "Docker & Containers")
        self.assertEqual(normalize_skill_name("k8s"), "Kubernetes")
        self.assertEqual(normalize_skill_name("postgres"), "PostgreSQL")

    def test_assessment_skill_extraction(self):
        answers = [
            {"skill": "python", "is_correct": True, "score": 100, "weight": 1.0},
            {"skill": "python", "is_correct": True, "score": 90, "weight": 1.0},
            {"skill": "docker", "is_correct": False, "score": 30, "weight": 1.0},
        ]
        extracted = extract_assessment_skills(answers)
        self.assertEqual(len(extracted), 2)
        
        py_skill = next(s for s in extracted if s["skill"] == "Python")
        self.assertEqual(py_skill["score"], 95)
        self.assertEqual(py_skill["proficiency"], "EXPERT")

        docker_skill = next(s for s in extracted if s["skill"] == "Docker & Containers")
        self.assertEqual(docker_skill["score"], 30)
        self.assertEqual(docker_skill["proficiency"], "NOVICE")

    def test_profiling_service_end_to_end(self):
        submission = AssessmentSubmission(
            user_id="usr-101",
            assessment_id="ass-202",
            answers=[
                {"skill": "fastapi", "is_correct": True, "score": 85, "weight": 1.0},
                {"skill": "postgresql", "is_correct": True, "score": 80, "weight": 1.0},
            ]
        )
        profile = SkillProfilingService.profile_assessment(submission)
        self.assertEqual(profile["user_id"], "usr-101")
        self.assertGreaterEqual(profile["overall_score"], 80)
        self.assertEqual(len(profile["skills"]), 2)

if __name__ == '__main__':
    unittest.main()
