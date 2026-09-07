from typing import Dict, Any, List, Optional

def calculate_readiness_score(student_profile: Dict[str, Any]) -> Dict[str, Any]:
    """
    Computes a transparent, evidence-based career readiness score based on:
    - Technical Competency (30%)
    - Skill Proficiency Band (20%)
    - Assessments & Test Performance (15%)
    - Live Projects & Open Source (10%)
    - Practical Industry Experience (10%)
    - Verified Certifications (5%)
    - Role / Career Alignment (5%)
    - Professional & Soft Skills (5%)
    """
    skills: List[Dict[str, Any]] = student_profile.get("skills", [])
    assessments: List[Dict[str, Any]] = student_profile.get("assessments", [])
    projects: List[Dict[str, Any]] = student_profile.get("projects", [])
    certifications: List[Dict[str, Any]] = student_profile.get("certifications", [])
    experience_months: int = int(student_profile.get("experience_months", 0))

    # 1. Technical Skills Score (based on verified skill count & ratings)
    if skills:
        skill_scores = [float(s.get("score", 70)) for s in skills]
        technical_score = round(sum(skill_scores) / len(skill_scores), 1)
    else:
        technical_score = 45.0

    # 2. Skill Proficiency (advanced/expert ratio)
    expert_count = sum(1 for s in skills if s.get("proficiency") in ["EXPERT", "ADVANCED"])
    proficiency_score = min(100.0, max(30.0, (expert_count / max(len(skills), 1)) * 100.0)) if skills else 40.0

    # 3. Assessment Performance
    if assessments:
        ass_scores = [float(a.get("score", 70)) for a in assessments]
        assessment_score = round(sum(ass_scores) / len(ass_scores), 1)
    else:
        assessment_score = min(100.0, technical_score * 0.9)

    # 4. Projects & Portfolios
    project_score = min(100.0, max(25.0, len(projects) * 30.0))

    # 5. Experience
    experience_score = min(100.0, max(20.0, (experience_months / 12.0) * 50.0 + 30.0))

    # 6. Certifications
    cert_score = min(100.0, max(20.0, len(certifications) * 35.0))

    # 7. Soft Skills & Alignment
    soft_skills_score = float(student_profile.get("soft_skills_score", 75.0))
    career_alignment = float(student_profile.get("career_alignment_score", 80.0))

    # Weighted calculation
    overall = int(
        (technical_score * 0.30) +
        (proficiency_score * 0.20) +
        (assessment_score * 0.15) +
        (project_score * 0.10) +
        (experience_score * 0.10) +
        (cert_score * 0.05) +
        (career_alignment * 0.05) +
        (soft_skills_score * 0.05)
    )

    if overall >= 85:
        tier = "TIER 01 - INDUSTRY READY"
        explanation = "High mastery across core competencies with verified assessment benchmarks and live project portfolio."
    elif overall >= 70:
        tier = "TIER 02 - ACCREDITED CANDIDATE"
        explanation = "Solid foundation across engineering competencies; targeted skill remediation will elevate candidate to top bracket."
    elif overall >= 50:
        tier = "TIER 03 - DEVELOPING CANDIDATE"
        explanation = "Developing core skills; requires additional live projects and diagnostic assessment completions."
    else:
        tier = "TIER 04 - FOUNDATIONAL"
        explanation = "Foundational stage. Focus on structured courses and essential coding sprints."

    return {
        "overall_score": overall,
        "tier": tier,
        "percentile": min(99, max(5, int(overall * 0.95 + 4))),
        "component_scores": {
            "technical_competency": round(technical_score, 1),
            "skill_proficiency": round(proficiency_score, 1),
            "assessment_performance": round(assessment_score, 1),
            "projects_portfolio": round(project_score, 1),
            "practical_experience": round(experience_score, 1),
            "verified_certifications": round(cert_score, 1),
            "soft_skills": round(soft_skills_score, 1),
            "career_alignment": round(career_alignment, 1)
        },
        "explanation": explanation
    }
