import re
from typing import Dict, Optional

CANONICAL_SKILL_MAP: Dict[str, str] = {
    # Programming Languages & Runtimes
    "python": "Python",
    "python3": "Python",
    "py": "Python",
    "python 3": "Python",
    "asyncio": "Python",
    
    "javascript": "JavaScript",
    "js": "JavaScript",
    "es6": "JavaScript",
    "ecmascript": "JavaScript",
    
    "typescript": "TypeScript",
    "ts": "TypeScript",
    
    "java": "Java",
    "golang": "Go",
    "go": "Go",
    "rust": "Rust",
    "c++": "C++",
    "cpp": "C++",

    # Frameworks & Libraries
    "react": "React.js",
    "react.js": "React.js",
    "reactjs": "React.js",
    "react js": "React.js",
    
    "next": "Next.js",
    "next.js": "Next.js",
    "nextjs": "Next.js",
    "next js": "Next.js",

    "django": "Django",
    "django rest framework": "Django",
    "drf": "Django",

    "fastapi": "FastAPI",
    "fast-api": "FastAPI",
    "fast api": "FastAPI",

    "node": "Node.js",
    "node.js": "Node.js",
    "nodejs": "Node.js",

    # Databases & Storage
    "postgresql": "PostgreSQL",
    "postgres": "PostgreSQL",
    "psql": "PostgreSQL",
    "pg": "PostgreSQL",
    "sql": "SQL & Relational Databases",
    "mysql": "MySQL",
    "mongodb": "MongoDB",
    "redis": "Redis & In-Memory Caching",

    # Infrastructure & DevOps
    "docker": "Docker & Containers",
    "docker container": "Docker & Containers",
    "dockerization": "Docker & Containers",
    "docker-compose": "Docker & Containers",
    "containers": "Docker & Containers",

    "kubernetes": "Kubernetes",
    "k8s": "Kubernetes",
    "kube": "Kubernetes",

    "aws": "Cloud & AWS Infrastructure",
    "amazon web services": "Cloud & AWS Infrastructure",
    "cloud": "Cloud Architecture",
    "ci/cd": "CI/CD & DevOps Automation",
    "cicd": "CI/CD & DevOps Automation",
    "git": "Git & Version Control",

    # Architecture & Core Engineering
    "system design": "System Design & Distributed Systems",
    "distributed systems": "System Design & Distributed Systems",
    "microservices": "Microservices Architecture",
    "rest api": "RESTful API Design",
    "restful": "RESTful API Design",
    "graphql": "GraphQL",

    # AI / ML
    "machine learning": "AI & Machine Learning",
    "ml": "AI & Machine Learning",
    "ai": "AI & Machine Learning",
    "pytorch": "PyTorch & Deep Learning",
    "tensorflow": "TensorFlow",
    "nlp": "Natural Language Processing",

    # Soft Skills & Foundations
    "communication": "Professional Communication",
    "teamwork": "Team Collaboration",
    "problem solving": "Problem Solving & DSA",
    "dsa": "Problem Solving & DSA",
    "data structures": "Problem Solving & DSA",
    "algorithms": "Problem Solving & DSA",
}

def normalize_skill_name(name: str) -> str:
    """
    Normalizes raw skill strings or aliases to standard canonical skill names.
    Examples:
        'react.js' -> 'React.js'
        'React JS' -> 'React.js'
        'python3'  -> 'Python'
    """
    if not name or not isinstance(name, str):
        return "General Competency"
    
    cleaned = name.strip().lower()
    cleaned = re.sub(r'[_\-]+', ' ', cleaned)
    cleaned = re.sub(r'\s+', ' ', cleaned)

    if cleaned in CANONICAL_SKILL_MAP:
        return CANONICAL_SKILL_MAP[cleaned]

    # Substring / key word matching fallback
    for alias, canonical in CANONICAL_SKILL_MAP.items():
        if alias == cleaned:
            return canonical

    return name.strip().title()
