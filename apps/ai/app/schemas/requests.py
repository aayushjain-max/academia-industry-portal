from pydantic import BaseModel
from typing import List, Optional

class AssessmentSubmission(BaseModel):
    user_id: str
    assessment_id: str
    answers: List[dict]

class JDAnalyzeRequest(BaseModel):
    raw_text: str

class OpportunityMatchRequest(BaseModel):
    user_id: str
    opportunity_id: str
    user_skills: List[str]
    required_skills: List[str]
    experience_years: Optional[float] = 0.0
