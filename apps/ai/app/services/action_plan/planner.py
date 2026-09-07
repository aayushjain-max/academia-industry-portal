from typing import List, Dict, Any

def generate_action_steps(skill_name: str, target_role: str = "Software Engineer", current_level: int = 40) -> List[Dict[str, Any]]:
    """
    Generates structured action steps for closing a specific skill gap.
    """
    skill_clean = skill_name.strip().title()
    return [
        {
            "step": 1,
            "title": f"Study {skill_clean} Core Fundamentals",
            "description": f"Understand design patterns, conventions, and architecture of {skill_clean}.",
            "difficulty": "BEGINNER" if current_level < 50 else "INTERMEDIATE",
            "estimated_hours": 12,
            "status": "NOT_STARTED"
        },
        {
            "step": 2,
            "title": f"Build Hands-on {skill_clean} Project Module",
            "description": f"Construct a tested production-ready project incorporating {skill_clean} for your portfolio.",
            "difficulty": "INTERMEDIATE",
            "estimated_hours": 20,
            "status": "NOT_STARTED"
        },
        {
            "step": 3,
            "title": f"Complete {skill_clean} Verified Diagnostic Assessment",
            "description": "Attain >80% proficiency benchmark to update your Digital Skill Passport.",
            "difficulty": "ADVANCED",
            "estimated_hours": 4,
            "status": "NOT_STARTED"
        }
    ]
