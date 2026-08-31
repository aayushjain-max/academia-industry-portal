from fastapi import APIRouter
from app.schemas.requests import AssessmentSubmission

router = APIRouter()

@router.post("/profile")
async def generate_skill_profile(data: AssessmentSubmission):
    return {
        "user_id": data.user_id,
        "skills": [
            {"skill": "Python", "score": 85, "category": "TECHNICAL"},
            {"skill": "Communication", "score": 75, "category": "SOFT"}
        ]
    }
