from typing import List, Dict, Any, Optional

SKILL_CURRICULUM_MAP: Dict[str, Dict[str, Any]] = {
    "docker": {
        "title": "Docker & Container Orchestration Remediation Sprint",
        "weeks": [
            {
                "week": 1,
                "focus": "Containerization Fundamentals",
                "topics": ["Dockerfile syntax", "Multi-stage builds", "Layer caching optimization", "CLI commands"],
                "deliverable": "Containerize a Django/FastAPI app with non-root user and minimal image size (<150MB)"
            },
            {
                "week": 2,
                "focus": "Multi-Container Orchestration with Docker Compose",
                "topics": ["Compose v2 specs", "Volume persistence", "Bridge networking", "Healthchecks & dependencies"],
                "deliverable": "Spin up complete stack: Web + PostgreSQL + Redis with single compose up command"
            },
            {
                "week": 3,
                "focus": "Container Security & Production Best Practices",
                "topics": ["Trivy vulnerability scanning", "Secret management with env files", "Resource limits (CPU/RAM)"],
                "deliverable": "Zero critical CVE build passing automated GitHub Actions scan"
            },
            {
                "week": 4,
                "focus": "Capstone & Verification",
                "topics": ["Automated deployment test", "Docker registry push", "Verification benchmark"],
                "deliverable": "Submit live project repository and take proctored Docker Skill Assessment"
            }
        ],
        "resources": [
            {"title": "Docker Official Docs & Deep Dive", "url": "https://docs.docker.com", "type": "Documentation"},
            {"title": "Production Containerization Masterclass", "url": "https://portal.local/learn/docker-mastery", "type": "Interactive Lab"}
        ]
    },
    "kubernetes": {
        "title": "Kubernetes Cluster Architecture Sprint",
        "weeks": [
            {
                "week": 1,
                "focus": "K8s Architecture & Primitives",
                "topics": ["Pods, Deployments, ReplicaSets", "Kubelet, API Server, etcd", "kubectl mastery"],
                "deliverable": "Deploy stateless web microservice with 3 replicas on Minikube / Kind"
            },
            {
                "week": 2,
                "focus": "Networking & Ingress Controllers",
                "topics": ["ClusterIP, NodePort, LoadBalancer", "Ingress-NGINX rules", "TLS termination"],
                "deliverable": "Route custom subdomains to separate backend services through Ingress"
            },
            {
                "week": 3,
                "focus": "Storage & Configuration Management",
                "topics": ["PersistentVolumes & Claims", "ConfigMaps & Secrets", "StatefulSets"],
                "deliverable": "Deploy persistent PostgreSQL database with automated snapshot backup"
            },
            {
                "week": 4,
                "focus": "Scaling & Self-Healing Capstone",
                "topics": ["Horizontal Pod Autoscaler (HPA)", "Liveness/Readiness probes", "Rolling updates"],
                "deliverable": "Simulate traffic spike and pass automated cluster resilience test"
            }
        ],
        "resources": [
            {"title": "Kubernetes Hands-on Lab", "url": "https://kubernetes.io/docs/tutorials", "type": "Interactive Guide"}
        ]
    },
    "postgresql": {
        "title": "Advanced PostgreSQL & Query Optimization Plan",
        "weeks": [
            {
                "week": 1,
                "focus": "Indexing & Query Execution Plans",
                "topics": ["B-Tree, GIN, GiST indexes", "EXPLAIN ANALYZE interpretation", "Sequential scan mitigation"],
                "deliverable": "Optimize 5 complex queries reducing execution time by >70%"
            },
            {
                "week": 2,
                "focus": "Concurrency & Transaction Isolation",
                "topics": ["ACID guarantees", "MVCC mechanism", "Row-level locking vs Table locks", "Deadlock prevention"],
                "deliverable": "Implement safe financial ledger transaction script handling concurrent writes"
            },
            {
                "week": 3,
                "focus": "Partitioning & Connection Pooling",
                "topics": ["Declarative range/list partitioning", "PgBouncer configuration", "Vacuuming & WAL tuning"],
                "deliverable": "Partition a 10M record audit log table with sub-millisecond query response"
            },
            {
                "week": 4,
                "focus": "DB Assessment & Digital Badge",
                "topics": ["Advanced SQL window functions", "CTE benchmarks", "Certification assessment"],
                "deliverable": "Score >85% on Advanced Database Assessment for Skill Passport credential"
            }
        ],
        "resources": [
            {"title": "Use The Index, Luke (SQL Indexing)", "url": "https://use-the-index-luke.com", "type": "Guide"}
        ]
    }
}

class ActionPlanService:
    @staticmethod
    def generate_plan(user_id: str, skill_gap: str, target_role: str = "Backend Developer", current_level: int = 30) -> Dict[str, Any]:
        normalized = skill_gap.strip().lower()
        matched_curriculum = None

        for k, v in SKILL_CURRICULUM_MAP.items():
            if k in normalized or normalized in k:
                matched_curriculum = v
                break

        if not matched_curriculum:
            # Fallback dynamic generic plan with structured milestones
            skill_name = skill_gap.strip().title()
            matched_curriculum = {
                "title": f"{skill_name} Competency Sprint for {target_role}",
                "weeks": [
                    {
                        "week": 1,
                        "focus": f"{skill_name} Foundations & Setup",
                        "topics": [f"Core syntax and paradigms of {skill_name}", "Tooling, Linters & Development environment"],
                        "deliverable": f"Build sandbox test environment and implement basic {skill_name} modules."
                    },
                    {
                        "week": 2,
                        "focus": f"Intermediate Architecture & Practical Application",
                        "topics": [f"Design patterns in {skill_name}", "Error handling and asynchronous processing"],
                        "deliverable": f"Implement intermediate feature module with unit test coverage >80%."
                    },
                    {
                        "week": 3,
                        "focus": f"Production Integration & Optimization",
                        "topics": ["Performance tuning", "Security hardening", "CI/CD automated testing"],
                        "deliverable": f"Deploy live end-to-end service using {skill_name}."
                    },
                    {
                        "week": 4,
                        "focus": "Assessment & Skill Passport Verification",
                        "topics": ["Comprehensive review", "Mock technical interview", "Assessment proctoring"],
                        "deliverable": f"Pass {skill_name} benchmark assessment and mint verified passport badge."
                    }
                ],
                "resources": [
                    {"title": f"Complete {skill_name} Guide", "url": f"https://portal.local/learn/{normalized}", "type": "Interactive Course"},
                    {"title": f"{skill_name} Best Practices & Architecture", "url": "https://portal.local/docs", "type": "Reference"}
                ]
            }

        priority = "CRITICAL" if current_level < 40 else ("HIGH" if current_level < 60 else "MEDIUM")

        return {
            "user_id": user_id,
            "skill_gap": skill_gap,
            "target_role": target_role,
            "current_level": current_level,
            "priority": priority,
            "estimated_weeks": len(matched_curriculum["weeks"]),
            "plan_title": matched_curriculum["title"],
            "schedule": matched_curriculum["weeks"],
            "resources": matched_curriculum["resources"]
        }
