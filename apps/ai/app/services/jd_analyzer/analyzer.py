import re
from .extractor import extract_skills_from_text, extract_experience, extract_qualifications, extract_job_title

def extract_responsibilities(text: str):
    resps = []
    # Search for bullet points or numbered items under responsibilities/duties
    in_resp_section = False
    for line in text.split('\n'):
        line_s = line.strip()
        if re.search(r'(responsibilities|duties|what you\'?ll do|key tasks)', line_s, re.IGNORECASE):
            in_resp_section = True
            continue
        if in_resp_section:
            if re.search(r'(qualifications|requirements|skills|about us|benefits)', line_s, re.IGNORECASE) and len(line_s) < 40:
                break
            if line_s.startswith(('-', '*', '•', '1.', '2.', '3.', '4.', '5.')):
                clean_bullet = re.sub(r'^[\-\*\•\d\.\s]+', '', line_s).strip()
                if len(clean_bullet) > 10:
                    resps.append(clean_bullet)

    if not resps:
        resps = [
            "Architect and implement production-grade robust features and microservices.",
            "Collaborate cross-functionally to define specs and deliver clean, maintainable code.",
            "Write comprehensive tests, optimize performance, and maintain CI/CD pipelines."
        ]
    return resps[:5]

def extract_salary(text: str) -> str:
    salary_patterns = [
        r'(₹\s*[\d,]+(?:\s*-\s*₹?\s*[\d,]+)?(?:\s*(?:LPA|per annum|per month|/mo|PM))?)',
        r'(\$\s*[\d,]+(?:\s*-\s*\$?\s*[\d,]+)?(?:\s*(?:k|K|per year|/yr))?)',
        r'(\d+\s*(?:to|-)\s*\d+\s*(?:LPA|Lacs|Lakhs))'
    ]
    for p in salary_patterns:
        m = re.search(p, text, re.IGNORECASE)
        if m:
            return m.group(1).strip()
    return "Competitive Market Standard (Stipend / CTC)"

def extract_location(text: str) -> str:
    loc_match = re.search(r'(?:location|workplace|city)\s*[:\-]\s*([^\n\r,]+)', text, re.IGNORECASE)
    if loc_match:
        return loc_match.group(1).strip()
    if re.search(r'\bremote\b', text, re.IGNORECASE):
        return "Remote"
    if re.search(r'\bhybrid\b', text, re.IGNORECASE):
        return "Hybrid"
    return "Bangalore / Mumbai / Pune (On-site / Hybrid)"

def analyze_jd(text: str):
    extracted_skills = extract_skills_from_text(text)
    job_title = extract_job_title(text)
    experience = extract_experience(text)
    qualifications = extract_qualifications(text)
    responsibilities = extract_responsibilities(text)
    salary_range = extract_salary(text)
    location = extract_location(text)
    
    tech_skills = extracted_skills["technical"]
    req_skills = tech_skills[:6] if tech_skills else ["Problem Solving", "Software Development", "Data Structures"]
    pref_skills = tech_skills[6:10] if len(tech_skills) > 6 else ["System Design", "Cloud Infrastructure"]
    
    return {
        "job_title": job_title,
        "required_skills": req_skills,
        "preferred_skills": pref_skills,
        "qualifications": qualifications,
        "experience": experience,
        "responsibilities": responsibilities,
        "salary_range": salary_range,
        "location": location,
        "industry": "Information Technology / Engineering",
        "keywords": req_skills + pref_skills + extracted_skills["soft"]
    }
