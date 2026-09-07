from fastapi import APIRouter, Query, HTTPException
from typing import Optional, Dict
from app.services.skill_gap.service import SkillGapService

router = APIRouter()

@router.get("/analyze/{user_id}")
async def analyze_skill_gap(
    user_id: str,
    target_role: str = Query("Backend Developer", description="Target job role to benchmark against")
):
    try:
        return SkillGapService.analyze_gaps(user_id=user_id, target_role=target_role)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Skill gap analysis failed: {str(e)}")
