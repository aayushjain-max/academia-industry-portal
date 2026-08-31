from fastapi import APIRouter
from app.schemas.responses import CareerReadinessResponse

router = APIRouter()

@router.get("/readiness/{user_id}", response_model=CareerReadinessResponse)
async def get_career_readiness(user_id: str):
    return {
        "overall_score": 78,
        "breakdown": {
            "Technical Skills": 82,
            "Soft Skills": 76,
            "Projects": 70,
            "Certifications": 85,
            "Experience": 60
        },
        "explanation": "Strong backend development readiness with high technical and certification credentials."
    }
