import sys
import os
import unittest

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.services.skill_gap.analyzer import compute_gaps
from app.services.skill_gap.service import SkillGapService

class TestSkillGapAnalysis(unittest.TestCase):
    def test_compute_gaps(self):
        current_skills = {"Python": 90, "PostgreSQL": 70, "Docker": 30}
        benchmarks = {"Python": 85, "PostgreSQL": 80, "Docker & Containers": 75}
        
        gaps = compute_gaps(current_skills, benchmarks)
        self.assertEqual(len(gaps), 3)

        docker_gap = next(g for g in gaps if "Docker" in g["skill"])
        self.assertEqual(docker_gap["deficit"], 45)
        self.assertEqual(docker_gap["priority"], "CRITICAL")
        self.assertEqual(docker_gap["status"], "DEFICIT")

        py_gap = next(g for g in gaps if g["skill"] == "Python")
        self.assertEqual(py_gap["deficit"], 0)
        self.assertEqual(py_gap["priority"], "SATISFIED")
        self.assertEqual(py_gap["status"], "BENCHMARK MET")

    def test_skill_gap_service(self):
        res = SkillGapService.analyze_gaps(
            user_id="usr-test",
            target_role="backend developer",
            user_skills={"Python": 85, "FastAPI": 80, "Docker": 40}
        )
        self.assertEqual(res["user_id"], "usr-test")
        self.assertIn("Backend Developer", res["target_role"])
        self.assertGreater(len(res["gaps"]), 0)
        self.assertIn("role_readiness_percentage", res)

if __name__ == '__main__':
    unittest.main()
