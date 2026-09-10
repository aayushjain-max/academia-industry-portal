from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from app.api.dependencies import verify_service_auth
from app.api.routes import (
    skill_profiling,
    skill_gap,
    career,
    action_plan,
    assistant,
    jd_analyzer,
    matching,
    learning,
)

app = FastAPI(
    title="Academia-Industry Portal AI Service",
    description="Dedicated microservice for Skill Profiling, Gap Analysis, JD Parsing, RAG Assistant, and Opportunity Matching.",
    version="1.0.0",
)

from app.config.settings import settings

app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in settings.ALLOWED_ORIGINS.split(",") if origin.strip()],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# AI Service Routers with Service Auth Protection
ai_dependencies = [Depends(verify_service_auth)]

app.include_router(skill_profiling.router, prefix="/api/v1/ai/skill-profiling", tags=["Skill Profiling"], dependencies=ai_dependencies)
app.include_router(skill_gap.router, prefix="/api/v1/ai/skill-gap", tags=["Skill Gap Analysis"], dependencies=ai_dependencies)
app.include_router(career.router, prefix="/api/v1/ai/career", tags=["Career Guidance & Readiness"], dependencies=ai_dependencies)
app.include_router(action_plan.router, prefix="/api/v1/ai/action-plan", tags=["Action Plan"], dependencies=ai_dependencies)
app.include_router(assistant.router, prefix="/api/v1/ai/assistant", tags=["Career Assistant (RAG)"], dependencies=ai_dependencies)
app.include_router(jd_analyzer.router, prefix="/api/v1/ai/jd-analyzer", tags=["JD Analyzer"], dependencies=ai_dependencies)
app.include_router(matching.router, prefix="/api/v1/ai/matching", tags=["Opportunity Matching"], dependencies=ai_dependencies)
app.include_router(learning.router, prefix="/api/v1/ai/learning", tags=["Learning Recommendations"], dependencies=ai_dependencies)

@app.get("/health")
@app.get("/api/v1/ai/health")
def health_check():
    return {"status": "ok", "service": "ai-microservice"}
