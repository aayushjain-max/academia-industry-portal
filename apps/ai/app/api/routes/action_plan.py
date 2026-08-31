from fastapi import APIRouter

router = APIRouter()

@router.post("/generate")
async def generate_action_plan(user_id: str, skill_gap: str = "Docker"):
    return {
        "user_id": user_id,
        "skill_gap": skill_gap,
        "priority": "High",
        "action_plan": [
            "1. Learn Docker fundamentals",
            "2. Complete Docker course",
            "3. Containerize an existing project",
            "4. Deploy project",
            "5. Add project to portfolio"
        ]
    }
