from pydantic import BaseModel
from typing import List, Dict, Optional

class MatchResponse(BaseModel):
    match_percentage: float
    matching_skills: List[str]
    missing_skills: List[str]
    eligibility: bool
    reason: str

class JDAnalysisResponse(BaseModel):
    job_title: str
    required_skills: List[str]
    preferred_skills: List[str]
    qualifications: List[str]
    experience: str
    responsibilities: List[str]
    salary_range: Optional[str] = None
    location: Optional[str] = None
    industry: Optional[str] = None
    keywords: List[str]

class CareerReadinessResponse(BaseModel):
    overall_score: int
    breakdown: Dict[str, int]
    explanation: str
