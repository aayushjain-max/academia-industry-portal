from typing import Dict, Any, Optional, List
from .readiness_scorer import calculate_readiness_score

class CareerGuidanceService:
    @staticmethod
    def calculate_readiness(
        user_id: str,
        technical_score: Optional[int] = None,
        soft_skills_score: Optional[int] = None,
        projects_score: Optional[int] = None,
        certifications_score: Optional[int] = None,
        experience_score: Optional[int] = None,
        profile_data: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """
        Calculates career readiness score based on genuine evidence.
        """
        if profile_data:
            return calculate_readiness_score(profile_data)

        # Build profile payload from provided inputs or compute
        tech = technical_score if technical_score is not None else 65
        soft = soft_skills_score if soft_skills_score is not None else 70
        proj = projects_score if projects_score is not None else 50
        cert = certifications_score if certifications_score is not None else 40
        exp = experience_score if experience_score is not None else 40

        student_profile = {
            "skills": [{"name": "Technical Assessment", "score": tech, "proficiency": "ADVANCED" if tech >= 70 else "INTERMEDIATE"}],
            "assessments": [{"score": tech}],
            "projects": [{"name": "Project"} for _ in range(max(0, int(proj / 35)))],
            "certifications": [{"name": "Cert"} for _ in range(max(0, int(cert / 40)))],
            "experience_months": int((exp / 100) * 12),
            "soft_skills_score": soft,
            "career_alignment_score": 75.0
        }

        res = calculate_readiness_score(student_profile)
        res["user_id"] = user_id
        return res

    @staticmethod
    def get_career_recommendations(user_id: str, current_role: str = "Student Engineer", skills: Optional[List[str]] = None) -> Dict[str, Any]:
        """
        Generates role recommendations based on candidate's skill matrix.
        """
        user_skills = set(s.lower() for s in (skills or ["python", "sql", "fastapi"]))
        
        tracks = [
            {
                "track": "Backend Cloud Architecture",
                "required_skills": ["python", "docker", "fastapi", "postgresql", "kubernetes"],
                "target_companies": ["TechNova Labs", "Tata Consultancy Services", "AWS Partners"],
                "stipend_range": "₹40,000 - ₹75,000 / mo",
            },
            {
                "track": "Full-Stack Web Systems",
                "required_skills": ["react", "next.js", "typescript", "node.js", "tailwind"],
                "target_companies": ["Barclays Global", "Infosys Digital"],
                "stipend_range": "₹35,000 - ₹60,000 / mo",
            },
            {
                "track": "AI & Data Engineering",
                "required_skills": ["python", "pytorch", "postgresql", "pandas", "machine learning"],
                "target_companies": ["Fractal AI", "Mu Sigma"],
                "stipend_range": "₹45,000 - ₹80,000 / mo",
            }
        ]

        scored_tracks = []
        for t in tracks:
            matched = [s for s in t["required_skills"] if any(us in s or s in us for us in user_skills)]
            missing = [s for s in t["required_skills"] if not any(us in s or s in us for us in user_skills)]
            match_pct = int((len(matched) / len(t["required_skills"])) * 100)
            scored_tracks.append({
                "track": t["track"],
                "match_score": match_pct,
                "target_companies": t["target_companies"],
                "stipend_range": t["stipend_range"],
                "prerequisites_needed": [m.title() for m in missing]
            })

        scored_tracks.sort(key=lambda x: x["match_score"], reverse=True)

        return {
            "user_id": user_id,
            "recommended_tracks": scored_tracks
        }
