from typing import List, Dict, Any, Set
from difflib import SequenceMatcher
from app.schemas.requests import OpportunityMatchRequest
from app.schemas.responses import MatchResponse

def string_similarity(a: str, b: str) -> float:
    return SequenceMatcher(None, a.lower().strip(), b.lower().strip()).ratio()

class OpportunityMatchingService:
    @staticmethod
    def match(payload: OpportunityMatchRequest) -> MatchResponse:
        user_skills_clean = [s.strip() for s in payload.user_skills if s.strip()]
        req_skills_clean = [s.strip() for s in payload.required_skills if s.strip()]

        if not req_skills_clean:
            return MatchResponse(
                match_percentage=100.0,
                matching_skills=user_skills_clean,
                missing_skills=[],
                eligibility=True,
                reason="No specific skill prerequisites required for this opportunity."
            )

        matched_skills: List[str] = []
        missing_skills: List[str] = []
        similarity_total = 0.0

        for req in req_skills_clean:
            best_sim = 0.0
            matched_candidate = None

            for u_skill in user_skills_clean:
                # Direct substring match
                if req.lower() in u_skill.lower() or u_skill.lower() in req.lower():
                    best_sim = max(best_sim, 0.95)
                    matched_candidate = req
                else:
                    sim = string_similarity(req, u_skill)
                    if sim > best_sim:
                        best_sim = sim
                        matched_candidate = req

            if best_sim >= 0.70:
                matched_skills.append(req)
                similarity_total += best_sim
            else:
                missing_skills.append(req)
                similarity_total += best_sim * 0.3

        # Base skill match percentage
        skill_match_pct = (similarity_total / len(req_skills_clean)) * 100.0

        # Experience factor adjustment
        exp_years = payload.experience_years or 0.0
        exp_boost = min(10.0, exp_years * 3.0)

        final_match_pct = round(min(100.0, max(0.0, (skill_match_pct * 0.9) + exp_boost)), 1)
        is_eligible = final_match_pct >= 55.0

        if final_match_pct >= 85:
            reason = f"Excellent compatibility: {len(matched_skills)}/{len(req_skills_clean)} competencies matched with strong experience alignment."
        elif final_match_pct >= 60:
            reason = f"Good qualification match. Candidate meets primary criteria; missing: {', '.join(missing_skills[:2]) or 'none'}."
        else:
            reason = f"Deficit in core prerequisites ({len(missing_skills)} missing skills). Candidate recommended to complete target action plan before applying."

        return MatchResponse(
            match_percentage=final_match_pct,
            matching_skills=matched_skills,
            missing_skills=missing_skills,
            eligibility=is_eligible,
            reason=reason
        )
