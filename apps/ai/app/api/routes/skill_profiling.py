from fastapi import APIRouter, HTTPException
from app.schemas.requests import AssessmentSubmission
from app.pipelines.profiling_pipeline import ProfilingPipeline

router = APIRouter()
pipeline = ProfilingPipeline()

@router.post("/profile")
async def generate_skill_profile(data: AssessmentSubmission):
    try:
        return pipeline.run(data)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to generate skill profile: {str(e)}")
