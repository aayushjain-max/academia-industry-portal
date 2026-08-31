from fastapi import APIRouter
from app.schemas.requests import JDAnalyzeRequest
from app.schemas.responses import JDAnalysisResponse

router = APIRouter()

@router.post("/analyze", response_model=JDAnalysisResponse)
async def analyze_job_description(payload: JDAnalyzeRequest):
    return {
        "job_title": "Full Stack Python Developer",
        "required_skills": ["Python", "Django", "PostgreSQL", "REST APIs", "Docker"],
        "preferred_skills": ["FastAPI", "Next.js", "Redis"],
        "qualifications": ["B.Tech / B.E in CS/IT or equivalent"],
        "experience": "1-3 Years",
        "responsibilities": ["Develop scalable microservices", "Collaborate with frontend engineers"],
        "salary_range": "INR 8,00,000 - 12,00,000 PA",
        "location": "Bangalore / Remote",
        "industry": "Software / SaaS",
        "keywords": ["Python", "Django", "REST", "Microservices"]
    }
