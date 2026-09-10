from typing import List, Dict, Any, Optional
from difflib import SequenceMatcher
from ..skill_profiling.normalizer import normalize_skill_name

DEFAULT_SCORING_WEIGHTS: Dict[str, float] = {
    "required_skills": 0.40,
    "preferred_skills": 0.15,
    "assessment_score": 0.15,
    "projects": 0.10,
    "experience": 0.10,
    "certifications": 0.05,
    "baseline": 0.05,
}

def string_similarity(a: str, b: str) -> float:
    return SequenceMatcher(None, a.lower().strip(), b.lower().strip()).ratio()

def compute_match_score(
    user_skills: List[str],
    required_skills: List[str],
    preferred_skills: Optional[List[str]] = None,
    experience_years: float = 0.0,
    assessment_score: Optional[float] = None,
    project_count: int = 0,
    cert_count: int = 0
) -> Dict[str, Any]:
    """
    Transparent weighted matching model:
    - Technical Required Skills (40%)
    - Preferred Skills Bonus (15%)
    - Assessment Performance (15%)
    - Projects Portfolio (10%)
    - Experience Alignment (10%)
    - Certifications (5%)
    - Baseline Alignment (5%)
    """
    norm_user = [normalize_skill_name(s) for s in user_skills]
    norm_req = [normalize_skill_name(s) for s in required_skills]
    norm_pref = [normalize_skill_name(s) for s in (preferred_skills or [])]

    if not norm_req:
        return {
            "match_percentage": 90.0,
            "matched_skills": norm_user,
            "missing_skills": [],
            "eligibility": True,
            "reason": "General role without specific technical prerequisites."
        }

    matched: List[str] = []
    missing: List[str] = []
    sim_score = 0.0

    for r in norm_req:
        best_sim = 0.0
        for u in norm_user:
            if r.lower() in u.lower() or u.lower() in r.lower():
                best_sim = max(best_sim, 1.0)
            else:
                sim = string_similarity(r, u)
                if sim > best_sim:
                    best_sim = sim
        
        if best_sim >= 0.70:
            matched.append(r)
            sim_score += best_sim
        else:
            missing.append(r)
            sim_score += best_sim * 0.2

    req_score = (sim_score / max(len(norm_req), 1)) * 100.0

    # Preferred skills bonus
    if norm_pref:
        pref_matches = sum(1 for p in norm_pref if any(p.lower() in u.lower() or u.lower() in p.lower() for u in norm_user))
        pref_score = (pref_matches / len(norm_pref)) * 100.0
    else:
        pref_score = req_score

    # Assessment factor
    ass_factor = assessment_score if assessment_score is not None else req_score

    # Project factor
    proj_factor = min(100.0, max(40.0, project_count * 25.0 + 30.0))

    # Experience factor
    exp_factor = min(100.0, max(40.0, experience_years * 25.0 + 40.0))

    # Cert factor
    cert_factor = min(100.0, max(30.0, cert_count * 35.0 + 30.0))

    # Weighted composite
    w = DEFAULT_SCORING_WEIGHTS
    composite = (
        (req_score * w["required_skills"]) +
        (pref_score * w["preferred_skills"]) +
        (ass_factor * w["assessment_score"]) +
        (proj_factor * w["projects"]) +
        (exp_factor * w["experience"]) +
        (cert_factor * w["certifications"]) +
        (80.0 * w["baseline"])
    )

    final_pct = round(min(100.0, max(0.0, composite)), 1)
    is_eligible = final_pct >= 50.0

    if final_pct >= 80:
        reason = f"Strong qualification match ({len(matched)}/{len(norm_req)} requirements met) with excellent profile alignment."
    elif final_pct >= 60:
        reason = f"Qualified candidate ({len(matched)}/{len(norm_req)} requirements met). Missing: {', '.join(missing[:2]) or 'none'}."
    else:
        reason = f"Core deficit ({len(missing)} missing prerequisites). Candidate advised to remediate gaps before applying."

    return {
        "match_percentage": final_pct,
        "matched_skills": matched,
        "missing_skills": missing,
        "eligibility": is_eligible,
        "reason": reason
    }
