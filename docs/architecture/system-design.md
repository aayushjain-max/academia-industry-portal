# System Design & Architecture

## Overview
The Academia–Industry Collaboration Platform is architected as a modular, cloud-ready ecosystem connecting four primary stakeholders: Students, Industries, Academicians, and Institutions.

```mermaid
graph TD
    Client[Next.js 15 Web Application] -->|Reverse Proxy| Nginx[Nginx Gateway]
    Nginx -->|SSR / Hydration| Frontend[Next.js Node Server]
    Nginx -->|REST / JWT| Backend[Django API Server]
    Nginx -->|Inference / Embeddings| AIService[FastAPI AI Service]
    
    Backend -->|CRUD & Relations| Postgres[(PostgreSQL DB)]
    Backend -->|Caching & Queues| Redis[(Redis Broker)]
    Backend -->|Async Jobs| Celery[Celery Workers]
    
    AIService -->|Vector Indices / Model APIs| LLM[LLM & Embeddings Engine]
    AIService -.->|Cache & Context| Redis
```

## Stakeholder Roles
1. **Student**: Career guidance, skill benchmarking, gap-remediation, micro-internships, placement matching.
2. **Industry**: Talent pipeline, automated job description intelligence, candidate matching, internship governance.
3. **Academician**: Faculty development programs (FDPs), industry internships, applied research collaborations, and mentorship.
4. **Institution**: Real-time batch skill heatmaps, employability analytics, compliance reporting, placement drives.
5. **Super Admin**: Verification authority, audit trail monitoring, platform governance.
