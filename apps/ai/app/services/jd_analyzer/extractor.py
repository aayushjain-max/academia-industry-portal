import re
from typing import List, Dict, Any

TECH_SKILLS_TAXONOMY = [
    "Python", "JavaScript", "TypeScript", "Java", "C++", "C#", "Go", "Rust", "PHP", "Ruby", "Swift", "Kotlin", "Scala",
    "Django", "FastAPI", "Flask", "React", "Next.js", "Vue.js", "Angular", "Node.js", "Express.js", "Spring Boot",
    "PostgreSQL", "MySQL", "MongoDB", "Redis", "Elasticsearch", "Cassandra", "DynamoDB", "SQLite",
    "Docker", "Kubernetes", "AWS", "Azure", "GCP", "CI/CD", "Git", "GitHub Actions", "Terraform", "Linux",
    "Machine Learning", "Deep Learning", "NLP", "Computer Vision", "TensorFlow", "PyTorch", "Scikit-Learn", "Pandas", "NumPy",
    "REST APIs", "GraphQL", "gRPC", "Microservices", "System Design", "Agile", "Scrum", "TDD", "Cybersecurity", "Kafka",
]

SOFT_SKILLS_TAXONOMY = [
    "Communication", "Problem Solving", "Teamwork", "Leadership", "Time Management", "Critical Thinking",
    "Adaptability", "Collaboration", "Work Ethic", "Analytical Thinking", "Presentation Skills",
]

def extract_skills_from_text(text: str) -> Dict[str, List[str]]:
    found_tech = []
    found_soft = []
    lower_text = " " + text.lower() + " "
    
    for skill in TECH_SKILLS_TAXONOMY:
        pattern = r'(?:\b|(?<=[^a-zA-Z0-9]))' + re.escape(skill.lower()) + r'(?:\b|(?=[^a-zA-Z0-9]))'
        if re.search(pattern, lower_text):
            found_tech.append(skill)

    for skill in SOFT_SKILLS_TAXONOMY:
        pattern = r'(?:\b|(?<=[^a-zA-Z0-9]))' + re.escape(skill.lower()) + r'(?:\b|(?=[^a-zA-Z0-9]))'
        if re.search(pattern, lower_text):
            found_soft.append(skill)
            
    return {
        "technical": found_tech,
        "soft": found_soft
    }

def extract_experience(text: str) -> str:
    patterns = [
        r'(\d+[\s\-]*(?:to|\-)?\s*\d*\+?\s*(?:years?|yrs?)(?:\s*of)?\s*(?:experience|exp)?)',
        r'((?:minimum|at least)?\s*\d+\+?\s*(?:years?|yrs?)\s*(?:experience)?)',
        r'(entry[\s\-]level|fresher|0\s*years?)'
    ]
    for p in patterns:
        m = re.search(p, text, re.IGNORECASE)
        if m:
            return m.group(1).strip()
    return "0-2 Years / Entry Level"

def extract_qualifications(text: str) -> List[str]:
    quals = []
    patterns = [
        r'(B\.?Tech|B\.?E\.?|B\.?Sc|BCA|M\.?Tech|M\.?Sc|MCA|MBA|Master\'?s|Bachelor\'?s)',
        r'(Computer Science|Information Technology|Electrical|Mechanical|Data Science)',
        r'((?:degree|diploma) in [a-zA-Z\s]+)'
    ]
    for p in patterns:
        matches = re.finditer(p, text, re.IGNORECASE)
        for match in matches:
            quals.append(match.group(0).strip())
    if not quals:
        return ["Bachelor's Degree in CS/IT or relevant technical field"]
    return list(dict.fromkeys(quals))

def extract_job_title(text: str) -> str:
    lines = [line.strip() for line in text.split('\n') if line.strip()]
    if lines:
        first_line = lines[0]
        if len(first_line) < 80 and not any(kw in first_line.lower() for kw in ['about', 'overview', 'description', 'company']):
            return first_line.replace('#', '').strip()
            
    title_matches = re.findall(r'(?:role|position|title|job title)\s*[:\-]\s*([^\n\r]+)', text, re.IGNORECASE)
    if title_matches:
        return title_matches[0].strip()
        
    return "Software Engineering Candidate"

