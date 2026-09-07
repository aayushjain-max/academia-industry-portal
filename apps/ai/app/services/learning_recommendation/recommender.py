from typing import List, Dict, Any
from .service import COURSE_CATALOG

def recommend_courses(skill_gaps: List[str]) -> List[Dict[str, Any]]:
    """
    Finds and ranks learning resources matching candidate skill gaps.
    """
    if not skill_gaps:
        return COURSE_CATALOG[:3]

    matched = []
    for course in COURSE_CATALOG:
        for gap in skill_gaps:
            if gap.lower() in course["skill"].lower() or course["skill"].lower() in gap.lower():
                matched.append({
                    **course,
                    "target_skill": gap,
                    "relevance_score": 95
                })
                break
    return matched or COURSE_CATALOG[:2]
