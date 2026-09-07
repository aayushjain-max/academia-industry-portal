from fastapi import APIRouter, Query, HTTPException
from app.schemas.responses import CareerReadinessResponse
from app.services.career_guidance.service import CareerGuidanceService

router = APIRouter()

@router.get("/readiness/{user_id}")
async def get_career_readiness(
    user_id: str,
    technical: int = Query(85, ge=0, le=100),
    soft_skills: int = Query(76, ge=0, le=100),
    projects: int = Query(70, ge=0, le=100),
    certifications: int = Query(85, ge=0, le=100),
    experience: int = Query(60, ge=0, le=100)
):
    try:
        return CareerGuidanceService.calculate_readiness(
            user_id=user_id,
            technical_score=technical,
            soft_skills_score=soft_skills,
            projects_score=projects,
            certifications_score=certifications,
            experience_score=experience
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Career readiness calculation failed: {str(e)}")

@router.get("/guidance/{user_id}")
async def get_career_guidance(user_id: str):
    try:
        return CareerGuidanceService.get_career_recommendations(user_id=user_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to fetch career guidance: {str(e)}")
