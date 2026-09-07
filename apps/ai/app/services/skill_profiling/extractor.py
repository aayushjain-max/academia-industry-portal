from typing import List, Dict, Any
from .normalizer import normalize_skill_name

def extract_assessment_skills(answers: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """
    Extracts and aggregates competencies from assessment answers.
    Calculates raw points, max points, accuracy %, and proficiency bands per normalized skill.
    """
    if not answers:
        return []

    skill_stats: Dict[str, Dict[str, float]] = {}

    for item in answers:
        raw_skill = item.get("skill") or item.get("category") or item.get("topic") or "Problem Solving"
        canonical = normalize_skill_name(str(raw_skill))
        
        is_correct = bool(item.get("is_correct", False))
        score = float(item.get("score", 100.0 if is_correct else 0.0))
        weight = float(item.get("weight", 1.0))
        max_score = float(item.get("max_score", 100.0)) * weight

        if canonical not in skill_stats:
            skill_stats[canonical] = {"obtained": 0.0, "total_possible": 0.0, "count": 0}

        skill_stats[canonical]["obtained"] += (score * weight)
        skill_stats[canonical]["total_possible"] += max_score
        skill_stats[canonical]["count"] += 1

    extracted = []
    for skill_name, stats in skill_stats.items():
        total_possible = max(stats["total_possible"], 1.0)
        percentage = round((stats["obtained"] / total_possible) * 100, 1)
        
        if percentage >= 85:
            proficiency = "EXPERT"
        elif percentage >= 70:
            proficiency = "ADVANCED"
        elif percentage >= 50:
            proficiency = "INTERMEDIATE"
        else:
            proficiency = "NOVICE"

        extracted.append({
            "skill": skill_name,
            "score": int(percentage),
            "proficiency": proficiency,
            "evaluated_questions": stats["count"],
            "evidence_type": "ASSESSMENT_VERIFIED",
            "confidence": 0.92 if stats["count"] >= 3 else 0.75
        })

    return sorted(extracted, key=lambda x: x["score"], reverse=True)
