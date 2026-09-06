from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
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

import os

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv(
        "ALLOWED_ORIGINS",
        "http://localhost:3000,http://127.0.0.1:3000,http://localhost:8000,http://127.0.0.1:8000"
    ).split(","),
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# API Routers
app.include_router(skill_profiling.router, prefix="/api/v1/ai/skill-profiling", tags=["Skill Profiling"])
app.include_router(skill_gap.router, prefix="/api/v1/ai/skill-gap", tags=["Skill Gap Analysis"])
app.include_router(career.router, prefix="/api/v1/ai/career", tags=["Career Guidance & Readiness"])
app.include_router(action_plan.router, prefix="/api/v1/ai/action-plan", tags=["Action Plan"])
app.include_router(assistant.router, prefix="/api/v1/ai/assistant", tags=["Career Assistant (RAG)"])
app.include_router(jd_analyzer.router, prefix="/api/v1/ai/jd-analyzer", tags=["JD Analyzer"])
app.include_router(matching.router, prefix="/api/v1/ai/matching", tags=["Opportunity Matching"])
app.include_router(learning.router, prefix="/api/v1/ai/learning", tags=["Learning Recommendations"])

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "ai-microservice"}
