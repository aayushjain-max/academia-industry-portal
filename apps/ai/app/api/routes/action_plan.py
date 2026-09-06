from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()

class ActionPlanRequest(BaseModel):
    user_id: str
    skill_gap: str
    target_role: Optional[str] = "Software Engineer"
    current_level: Optional[int] = 30

@router.post("/generate")
async def generate_action_plan(payload: ActionPlanRequest):
    skill = payload.skill_gap or "Distributed Systems"
    
    plan_steps = [
        f"Week 1: Master {skill} core architecture, key paradigms, and CLI tooling.",
        f"Week 2: Complete deep-dive hands-on modules and configure sandbox development environments.",
        f"Week 3: Build a production-grade micro-project integrating {skill} into your GitHub portfolio.",
        f"Week 4: Undergo technical assessment and submit skill verification snapshot for your Digital Skill Passport."
    ]
    
    return {
        "user_id": payload.user_id,
        "skill_gap": skill,
        "priority": "HIGH" if (payload.current_level or 0) < 50 else "MEDIUM",
        "target_role": payload.target_role,
        "estimated_weeks": 4,
        "action_plan": plan_steps,
        "resources": [
            {"title": f"Complete {skill} Bootcamp", "type": "Interactive Course", "platform": "AI Portal Academy"},
            {"title": f"Production {skill} Patterns", "type": "Architecture Guide", "platform": "Industry Standard"}
        ]
    }

