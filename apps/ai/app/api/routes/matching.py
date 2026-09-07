from fastapi import APIRouter, HTTPException
from app.schemas.requests import OpportunityMatchRequest
from app.schemas.responses import MatchResponse
from app.pipelines.matching_pipeline import MatchingPipeline

router = APIRouter()
pipeline = MatchingPipeline()

@router.post("/match", response_model=MatchResponse)
async def match_opportunity(payload: OpportunityMatchRequest):
    try:
        return pipeline.run(payload)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Opportunity matching failed: {str(e)}")
