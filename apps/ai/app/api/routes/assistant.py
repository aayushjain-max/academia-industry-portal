from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class ChatQuery(BaseModel):
    message: str
    user_id: str

@router.post("/chat")
async def chat_with_assistant(query: ChatQuery):
    return {
        "response": f"AI Career Assistant guidance for: '{query.message}'. Focus on hands-on project deployments to elevate your readiness score."
    }
