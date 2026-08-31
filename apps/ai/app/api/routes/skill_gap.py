from fastapi import APIRouter

router = APIRouter()

@router.get("/analyze/{user_id}")
async def analyze_skill_gap(user_id: str, target_role: str = "Backend Developer"):
    return {
        "user_id": user_id,
        "target_role": target_role,
        "gaps": [
            {"skill": "Docker", "priority": "HIGH", "current_level": 20, "required_level": 80},
            {"skill": "PostgreSQL", "priority": "MEDIUM", "current_level": 60, "required_level": 85}
        ]
    }
