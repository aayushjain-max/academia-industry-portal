from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, Dict, Any
from app.services.career_assistant.service import CareerAssistantService

router = APIRouter()

class ChatQuery(BaseModel):
    message: str
    user_id: str
    context: Optional[Dict[str, Any]] = None

@router.post("/chat")
async def chat_with_assistant(query: ChatQuery):
    try:
        return CareerAssistantService.answer_query(
            user_id=query.user_id,
            message=query.message,
            context=query.context
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Career assistant error: {str(e)}")
