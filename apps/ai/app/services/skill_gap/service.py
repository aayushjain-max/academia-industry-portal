from typing import List, Dict, Any, Optional
from .analyzer import compute_gaps

ROLE_BENCHMARKS: Dict[str, Dict[str, int]] = {
    "backend developer": {
        "Python": 85,
        "Django": 80,
        "FastAPI": 80,
        "PostgreSQL": 80,
        "Docker & Containers": 75,
        "RESTful API Design": 85,
        "System Design & Distributed Systems": 70,
        "CI/CD & DevOps Automation": 75
    },
    "frontend developer": {
        "JavaScript": 85,
        "TypeScript": 80,
        "React.js": 85,
        "Next.js": 80,
        "Professional Communication": 75
    },
    "fullstack engineer": {
        "TypeScript": 85,
        "React.js": 80,
        "Python": 80,
        "PostgreSQL": 75,
        "Docker & Containers": 70,
        "RESTful API Design": 80,
        "System Design & Distributed Systems": 70
    },
    "data scientist": {
        "Python": 90,
        "AI & Machine Learning": 85,
        "PyTorch & Deep Learning": 75,
        "SQL & Relational Databases": 80
    },
    "devops engineer": {
        "Docker & Containers": 90,
        "Kubernetes": 85,
        "CI/CD & DevOps Automation": 85,
        "Cloud Architecture": 80
    }
}

class SkillGapService:
    @staticmethod
    def analyze_gaps(user_id: str, target_role: str, user_skills: Optional[Dict[str, int]] = None) -> Dict[str, Any]:
        normalized_role = target_role.strip().lower()
        
        benchmarks = ROLE_BENCHMARKS.get(normalized_role)
        if not benchmarks:
            for role_name, b_data in ROLE_BENCHMARKS.items():
                if role_name in normalized_role or normalized_role in role_name:
                    benchmarks = b_data
                    break
        if not benchmarks:
            benchmarks = ROLE_BENCHMARKS["backend developer"]

        current_skills = user_skills or {"Python": 70, "PostgreSQL": 65}
        computed = compute_gaps(current_skills, benchmarks)

        deficits = [item for item in computed if item["deficit"] > 0]
        strengths = [item for item in computed if item["deficit"] == 0]

        total_req = sum(item["required_level"] for item in computed)
        total_def = sum(item["deficit"] for item in computed)
        readiness_pct = max(0, min(100, int(100 - (total_def / max(total_req, 1)) * 100)))

        return {
            "user_id": user_id,
            "target_role": target_role.title(),
            "role_readiness_percentage": readiness_pct,
            "critical_gap_count": sum(1 for g in deficits if g["priority"] in ["CRITICAL", "HIGH"]),
            "gaps": deficits,
            "strengths": strengths,
            "recommendation": f"Focus on closing {len(deficits)} identified skill gaps to reach full qualification for {target_role.title()}."
        }
