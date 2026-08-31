from pydantic import BaseModel
from typing import List, Optional, Dict

class SkillProfileItem(BaseModel):
    skill_name: str
    proficiency_level: str
    score: float
    verified: bool
