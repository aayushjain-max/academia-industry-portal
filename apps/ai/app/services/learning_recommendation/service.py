from typing import List, Dict, Any, Optional

COURSE_CATALOG = [
    {
        "id": "c-docker-01",
        "title": "Docker & Containerization for Production Backend Systems",
        "provider": "Portal Academy / Docker Certified",
        "skill": "Docker",
        "level": "INTERMEDIATE",
        "duration": "14 hours",
        "rating": 4.9,
        "enrolled": 1420,
        "url": "/learning/courses/docker-production",
        "modules_count": 8
    },
    {
        "id": "c-k8s-02",
        "title": "Kubernetes Microservice Orchestration & Helm Deployment",
        "provider": "CNCF Partner Portal",
        "skill": "Kubernetes",
        "level": "ADVANCED",
        "duration": "20 hours",
        "rating": 4.8,
        "enrolled": 980,
        "url": "/learning/courses/kubernetes-orchestration",
        "modules_count": 12
    },
    {
        "id": "c-pg-03",
        "title": "High-Performance PostgreSQL: Indexing, Execution Plans & Sharding",
        "provider": "Database Architecture Institute",
        "skill": "PostgreSQL",
        "level": "ADVANCED",
        "duration": "10 hours",
        "rating": 4.9,
        "enrolled": 2150,
        "url": "/learning/courses/postgresql-indexing",
        "modules_count": 6
    },
    {
        "id": "c-fastapi-04",
        "title": "Async Microservices with FastAPI, Celery & Redis",
        "provider": "Portal Engineering Track",
        "skill": "FastAPI",
        "level": "INTERMEDIATE",
        "duration": "16 hours",
        "rating": 4.9,
        "enrolled": 3400,
        "url": "/learning/courses/fastapi-async-architecture",
        "modules_count": 10
    },
    {
        "id": "c-react-05",
        "title": "Next.js 14 App Router, Server Components & Micro-Frontends",
        "provider": "Frontend Masters Partner",
        "skill": "React",
        "level": "ADVANCED",
        "duration": "18 hours",
        "rating": 4.8,
        "enrolled": 4120,
        "url": "/learning/courses/nextjs-app-router",
        "modules_count": 10
    },
    {
        "id": "c-sec-06",
        "title": "OWASP Top 10 & API Security Hardening",
        "provider": "Cyber Security Alliance",
        "skill": "Security",
        "level": "INTERMEDIATE",
        "duration": "12 hours",
        "rating": 4.7,
        "enrolled": 1800,
        "url": "/learning/courses/owasp-api-security",
        "modules_count": 7
    }
]

class LearningRecommendationService:
    @staticmethod
    def get_recommendations(user_id: str, deficit_skills: Optional[List[str]] = None) -> Dict[str, Any]:
        target_skills = deficit_skills or ["Docker", "Kubernetes", "PostgreSQL", "FastAPI"]
        matched_courses = []

        for course in COURSE_CATALOG:
            for d_skill in target_skills:
                if d_skill.lower() in course["skill"].lower() or course["skill"].lower() in d_skill.lower():
                    matched_courses.append({
                        **course,
                        "relevance_score": 95,
                        "reason": f"Directly addresses critical deficit in {course['skill']}"
                    })
                    break

        if not matched_courses:
            matched_courses = COURSE_CATALOG[:3]

        return {
            "user_id": user_id,
            "deficit_focus": target_skills,
            "recommendation_count": len(matched_courses),
            "estimated_completion_weeks": max(2, len(matched_courses) * 2),
            "courses": matched_courses,
            "project_labs": [
                {
                    "title": "Multi-Tenant Containerized API Capstone",
                    "skills_applied": ["Docker", "PostgreSQL", "FastAPI"],
                    "difficulty": "HARD",
                    "verification_badge": "Cloud Backend Engineer Badge"
                }
            ]
        }
