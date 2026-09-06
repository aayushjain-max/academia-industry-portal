from fastapi import APIRouter
from app.schemas.requests import JDAnalyzeRequest
from app.schemas.responses import JDAnalysisResponse
from app.services.jd_analyzer.analyzer import analyze_jd

router = APIRouter()

@router.post("/analyze", response_model=JDAnalysisResponse)
async def analyze_job_description(payload: JDAnalyzeRequest):
    return analyze_jd(payload.raw_text)

