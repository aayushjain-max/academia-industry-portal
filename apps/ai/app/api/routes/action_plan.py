from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from app.services.action_plan.service import ActionPlanService

router = APIRouter()

class ActionPlanRequest(BaseModel):
    user_id: str
    skill_gap: str
    target_role: Optional[str] = "Backend Developer"
    current_level: Optional[int] = 30

@router.post("/generate")
async def generate_action_plan(payload: ActionPlanRequest):
    try:
        return ActionPlanService.generate_plan(
            user_id=payload.user_id,
            skill_gap=payload.skill_gap,
            target_role=payload.target_role or "Backend Developer",
            current_level=payload.current_level or 30
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to generate action plan: {str(e)}")
