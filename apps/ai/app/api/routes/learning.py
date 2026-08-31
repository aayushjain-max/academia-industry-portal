from fastapi import APIRouter

router = APIRouter()

@router.get("/recommendations/{user_id}")
async def get_learning_recommendations(user_id: str):
    return {
        "user_id": user_id,
        "recommendations": [
            {"title": "Docker Mastery Course", "provider": "Coursera", "skill": "Docker", "duration": "12 hours"},
            {"title": "Advanced PostgreSQL Indexing", "provider": "Udemy", "skill": "PostgreSQL", "duration": "8 hours"}
        ]
    }
