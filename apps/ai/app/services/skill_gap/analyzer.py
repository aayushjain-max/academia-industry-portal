from typing import Dict, List, Any
from ..skill_profiling.normalizer import normalize_skill_name

def compute_gaps(current_skills: Dict[str, int], target_benchmarks: Dict[str, int]) -> List[Dict[str, Any]]:
    """
    Computes precise skill gaps between candidate verified/estimated skills and role benchmarks.
    """
    normalized_current = {normalize_skill_name(k): v for k, v in current_skills.items()}
    gaps = []

    for req_skill, req_level in target_benchmarks.items():
        norm_req = normalize_skill_name(req_skill)
        user_level = normalized_current.get(norm_req, 0)
        
        # Partial match if not exact
        if user_level == 0:
            for c_skill, c_val in normalized_current.items():
                if norm_req.lower() in c_skill.lower() or c_skill.lower() in norm_req.lower():
                    user_level = max(user_level, c_val)

        deficit = max(0, req_level - user_level)
        
        if deficit >= 30:
            priority = "CRITICAL"
            est_weeks = 4
            reason = f"Substantial gap in {norm_req} is blocking tier-1 shortlisting for this position."
        elif deficit >= 15:
            priority = "HIGH"
            est_weeks = 2
            reason = f"Moderate gap in {norm_req} requires targeted practice to meet industry expectations."
        elif deficit > 0:
            priority = "MEDIUM"
            est_weeks = 1
            reason = f"Minor gap in {norm_req} can be closed with focused refresher exercises."
        else:
            priority = "SATISFIED"
            est_weeks = 0
            reason = f"Candidate satisfies or exceeds the required proficiency for {norm_req}."

        gaps.append({
            "skill": norm_req,
            "current_level": user_level,
            "required_level": req_level,
            "deficit": deficit,
            "priority": priority,
            "estimated_weeks_to_close": est_weeks,
            "reason": reason,
            "status": "DEFICIT" if deficit > 0 else "BENCHMARK MET"
        })

    return sorted(gaps, key=lambda x: x["deficit"], reverse=True)
