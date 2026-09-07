import sys
import os
import unittest

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.services.jd_analyzer.analyzer import analyze_jd
from app.services.jd_analyzer.skill_extractor import extract_skills_from_jd
from app.services.jd_analyzer.report_generator import generate_jd_report

class TestJDAnalyzer(unittest.TestCase):
    def setUp(self):
        self.sample_jd = """
        Job Title: Senior Backend Distributed Systems Engineer
        Location: Bangalore, India (Hybrid)
        Experience: 3-5 years of experience
        Salary: ₹18,00,000 - ₹25,00,000 LPA

        About the Role:
        We are seeking an experienced Backend Engineer to scale our event-driven platform.

        Responsibilities:
        - Design and implement high-performance REST APIs and microservices using Python and FastAPI.
        - Optimize PostgreSQL queries, database schemas, and caching layers with Redis.
        - Manage containerized deployments using Docker and Kubernetes.
        - Ensure CI/CD pipeline automation and maintain high test coverage.

        Qualifications & Requirements:
        - B.Tech or M.Tech in Computer Science or equivalent.
        - Strong proficiency in Python, Django, or FastAPI.
        - Hands-on experience with PostgreSQL, Docker, and Kubernetes.
        - Excellent communication and problem-solving skills.
        """

    def test_extract_skills_from_jd(self):
        skills = extract_skills_from_jd(self.sample_jd)
        self.assertIn("Python", skills)
        self.assertIn("FastAPI", skills)
        self.assertIn("PostgreSQL", skills)
        self.assertIn("Docker & Containers", skills)

    def test_analyze_jd_full_pipeline(self):
        analysis = analyze_jd(self.sample_jd)
        self.assertIn("Backend", analysis["job_title"])
        self.assertTrue(len(analysis["required_skills"]) >= 3)
        self.assertIn("Python", analysis["required_skills"])
        self.assertEqual(analysis["location"], "Bangalore")
        self.assertTrue(len(analysis["responsibilities"]) >= 2)

        report = generate_jd_report(analysis)
        self.assertIn("JD Analysis", report["title"])
        self.assertGreater(report["skills_count"], 0)

if __name__ == '__main__':
    unittest.main()
