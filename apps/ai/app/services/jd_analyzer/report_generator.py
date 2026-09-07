from typing import Dict, Any

def generate_jd_report(analysis_result: Dict[str, Any]) -> Dict[str, Any]:
    """
    Generates structured executive report from JD analysis result.
    """
    title = analysis_result.get("job_title", "Engineering Role")
    req_skills = analysis_result.get("required_skills", [])
    exp = analysis_result.get("experience", "Entry Level")

    return {
        "title": f"JD Analysis: {title}",
        "summary": f"Position '{title}' requiring {len(req_skills)} primary competencies at {exp} seniority level.",
        "skills_count": len(req_skills),
        "primary_stack": req_skills[:4],
        "details": analysis_result
    }
