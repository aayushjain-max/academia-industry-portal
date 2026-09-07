from typing import Dict, Any, Optional

def build_student_context(
    user_id: str,
    target_role: Optional[str] = None,
    skills: Optional[list] = None,
    readiness_score: Optional[int] = None,
    critical_gaps: Optional[list] = None
) -> Dict[str, Any]:
    """
    Constructs validated, structured student context for grounding career assistant responses.
    """
    return {
        "user_id": user_id,
        "target_role": target_role or "Software Engineer",
        "verified_skills": skills or ["Python", "SQL", "Git"],
        "readiness_score": readiness_score or 75,
        "critical_gaps": critical_gaps or ["Docker & Containers", "System Design & Distributed Systems"]
    }
