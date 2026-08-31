from fastapi import APIRouter
from app.schemas.requests import OpportunityMatchRequest
from app.schemas.responses import MatchResponse

router = APIRouter()

@router.post("/match", response_model=MatchResponse)
async def match_opportunity(payload: OpportunityMatchRequest):
    req_set = set(payload.required_skills)
    user_set = set(payload.user_skills)
    matched = list(req_set.intersection(user_set))
    missing = list(req_set.difference(user_set))
    match_pct = round((len(matched) / max(len(req_set), 1)) * 100, 1)

    return {
        "match_percentage": match_pct,
        "matching_skills": matched,
        "missing_skills": missing,
        "eligibility": match_pct >= 60.0,
        "reason": f"Matched {len(matched)} of {len(req_set)} required core skills."
    }
