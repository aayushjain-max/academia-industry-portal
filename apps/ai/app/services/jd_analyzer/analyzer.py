from .extractor import extract_skills_from_text, extract_experience, extract_qualifications, extract_job_title

def analyze_jd(text: str):
    extracted_skills = extract_skills_from_text(text)
    job_title = extract_job_title(text)
    experience = extract_experience(text)
    qualifications = extract_qualifications(text)
    
    tech_skills = extracted_skills["technical"]
    req_skills = tech_skills[:6] if tech_skills else ["Problem Solving", "Software Development", "Data Structures"]
    pref_skills = tech_skills[6:10] if len(tech_skills) > 6 else ["System Design", "Cloud Infrastructure"]
    
    return {
        "job_title": job_title,
        "required_skills": req_skills,
        "preferred_skills": pref_skills,
        "qualifications": qualifications,
        "experience": experience,
        "responsibilities": [
            "Architect and implement production-grade robust features.",
            "Collaborate cross-functionally to define specs and deliver clean code.",
            "Write comprehensive tests and maintain CI/CD pipelines."
        ],
        "salary_range": "Competitive Market Standard",
        "location": "Hybrid / Remote Available",
        "industry": "Information Technology / Engineering",
        "keywords": req_skills + pref_skills + extracted_skills["soft"]
    }

