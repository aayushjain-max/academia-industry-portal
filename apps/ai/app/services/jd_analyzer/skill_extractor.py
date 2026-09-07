from typing import List
from .extractor import extract_skills_from_text
from ..skill_profiling.normalizer import normalize_skill_name

def extract_skills_from_jd(text: str) -> List[str]:
    """
    Extracts canonical skill names from JD text.
    """
    extracted = extract_skills_from_text(text)
    combined = extracted.get("technical", []) + extracted.get("soft", [])
    normalized = [normalize_skill_name(s) for s in combined]
    return list(dict.fromkeys(normalized))
