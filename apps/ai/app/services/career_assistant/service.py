import re
from typing import Dict, Any, List, Optional

CAREER_KNOWLEDGE_BASE = [
    {
        "patterns": [r"interview", r"prepare", r"round", r"technical interview"],
        "topic": "Technical Interview Preparation",
        "response": (
            "To excel in technical interviews:\n"
            "1. **Core Data Structures & Algorithms**: Master arrays, hash tables, graphs, and two-pointer patterns.\n"
            "2. **System Design & Concurrency**: Be ready to explain database indexing, caching strategies (Redis), and microservice APIs.\n"
            "3. **STAR Method**: Structure behavioral responses (Situation, Task, Action, Result) highlighting your role in team projects.\n"
            "4. **Live Coding**: Practice writing clean, idiomatic code with proper error handling on our Assessment Portal."
        )
    },
    {
        "patterns": [r"docker", r"container", r"kubernetes", r"k8s", r"devops"],
        "topic": "DevOps & Containerization Guidance",
        "response": (
            "Containerization is a top deficit among candidate profiles. Here is your roadmap:\n"
            "1. **Dockerfile Best Practices**: Use multi-stage builds, pin base image versions, and avoid running as root.\n"
            "2. **Docker Compose**: Orchestrate multi-tier environments (e.g., Next.js frontend + Django API + PostgreSQL + Redis).\n"
            "3. **Kubernetes Basics**: Learn Pods, Services, and Deployments. Deploy a sample microservice locally using Minikube or Kind."
        )
    },
    {
        "patterns": [r"resume", r"cv", r"portfolio", r"github"],
        "topic": "Resume & Digital Portfolio Optimization",
        "response": (
            "For a high-impact engineering profile:\n"
            "1. **Quantify Impact**: Instead of 'built an API', write 'engineered high-throughput REST API supporting 500+ RPS with <50ms p99 latency'.\n"
            "2. **Live Demos**: Include deployed URLs and GitHub repos with thorough READMEs, architecture diagrams, and test suites.\n"
            "3. **Verified Skill Passport**: Link your AICTE-accredited cryptographic badge ledger directly on your resume."
        )
    },
    {
        "patterns": [r"internship", r"micro-internship", r"stipend", r"apply", r"job"],
        "topic": "Internships & Industry Applications",
        "response": (
            "When targeting competitive industry internships:\n"
            "1. **Check Compatibility Scores**: Apply to opportunities where your Skill Match is >75% for higher shortlisting rates.\n"
            "2. **Complete Diagnostics**: Ensure your verified skill assessments are updated to show proof of competency.\n"
            "3. **Micro-Internships**: Take 2-4 week industry problem statements to earn verified credentials from partner enterprises."
        )
    },
    {
        "patterns": [r"readiness", r"score", r"tier", r"level"],
        "topic": "Career Readiness Scoring",
        "response": (
            "Your Career Readiness Score is calculated from 5 deterministic components:\n"
            "- **Technical Competency (35%)**: Verified assessment scores\n"
            "- **Live Projects (20%)**: Repositories and production deployments\n"
            "- **Certifications (20%)**: Proctored badges & credentials\n"
            "- **Experience (15%)**: Completed internships & collaborative tracks\n"
            "- **Soft Skills (10%)**: Communication and problem-solving evaluations."
        )
    }
]

class CareerAssistantService:
    @staticmethod
    def answer_query(user_id: str, message: str, context: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        msg_lower = message.strip().lower()
        matched_item = None

        for item in CAREER_KNOWLEDGE_BASE:
            for pattern in item["patterns"]:
                if re.search(pattern, msg_lower):
                    matched_item = item
                    break
            if matched_item:
                break

        if matched_item:
            response_text = matched_item["response"]
            topic = matched_item["topic"]
        else:
            topic = "General Career Advisory"
            response_text = (
                f"Regarding '{message}': Based on your candidate profile, we recommend focusing on strengthening your "
                "core technical benchmarks, completing proctored assessments to raise your verified competency score, "
                "and engaging in live industry micro-internships. Check your Skill Gap Matrix to view targeted sprint plans."
            )

        return {
            "user_id": user_id,
            "topic": topic,
            "response": response_text,
            "suggested_actions": [
                {"label": "Run Skill Gap Diagnostic", "href": "/student/skill-gaps"},
                {"label": "View Skill Passport", "href": "/student/skill-passport"},
                {"label": "Browse Matched Opportunities", "href": "/student/opportunities"}
            ]
        }
