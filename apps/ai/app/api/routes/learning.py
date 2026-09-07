from fastapi import APIRouter, Query, HTTPException
from typing import Optional, List
from app.services.learning_recommendation.service import LearningRecommendationService

router = APIRouter()

@router.get("/recommendations/{user_id}")
async def get_learning_recommendations(
    user_id: str,
    deficits: Optional[str] = Query(None, description="Comma-separated list of deficit skills")
):
    try:
        deficit_list = [d.strip() for d in deficits.split(",")] if deficits else None
        return LearningRecommendationService.get_recommendations(user_id=user_id, deficit_skills=deficit_list)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to fetch learning recommendations: {str(e)}")
