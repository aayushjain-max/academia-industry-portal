# Academia–Industry Collaboration Platform

A production-ready, scalable, and modular web platform bridging the gap between academic skills and industry requirements.

## 🚀 Vision & Problem Statement
There is a significant gap between academic curricula and evolving industry needs. 
- **Students** require skill assessments, actionable career pathways, personalized learning recommendations, micro-internships, and placement opportunities.
- **Industries** need direct access to pre-assessed, verified skilled candidates, AI-powered JD analysis, and candidate matching.
- **Academicians** need avenues for faculty industrial training, FDPs, research partnerships, and consultancy.
- **Institutions** need centralized real-time dashboards to track student skill development, employability metrics, placement pipelines, and industry demand heatmaps.

---

## 🏗️ Architecture Overview

```
academia-industry-portal/
├── apps/
│   ├── web/         # Next.js 15+ App Router, Tailwind CSS, TypeScript, shadcn/ui
│   ├── api/         # Django REST Framework, PostgreSQL, Redis, Celery
│   └── ai/          # FastAPI Python AI Microservice (Skill Profiling, Matching, RAG)
├── packages/
│   ├── shared-types/# Universal TypeScript definitions
│   ├── ui/          # Shared design system components
│   ├── api-client/  # Type-safe API client for frontend & integrations
│   └── config/      # Shared tooling (ESLint, Prettier, TypeScript)
├── infrastructure/  # Docker, Nginx, PostgreSQL, Redis, Deployment manifests
├── docs/            # Architecture diagrams, API specs, feature documentation
└── scripts/         # Database seeding, admin setup, testing utilities
```

---

## 🛠️ Quick Start

### Prerequisites
- Node.js >= 20.0.0 & pnpm >= 9.0.0
- Python >= 3.11
- Docker & Docker Compose
- PostgreSQL 16 & Redis 7

### 1. Environment Configuration
```bash
cp .env.example .env
```

### 2. Run with Docker Compose
```bash
docker-compose up --build -d
```

### 3. Service Endpoints
- **Frontend (Web)**: `http://localhost:3000`
- **Backend API (Django)**: `http://localhost:8000/api/v1/`
- **API Documentation**: `http://localhost:8000/api/docs/`
- **AI Microservice**: `http://localhost:8001/`
- **AI Docs (Swagger)**: `http://localhost:8001/docs`

---

## 🔐 Role-Based Access Control (RBAC)
- `STUDENT`: Assessments, Skill Passport, Action Plans, Job/Internship Applications.
- `INDUSTRY`: Job/Internship Postings, JD Analyzer, Candidate Search & Matching.
- `ACADEMICIAN`: FDPs, Industrial Training, Research Collabs, Mentorship.
- `INSTITUTION_ADMIN`: Skill Heatmaps, Batch Employability, Student/Placement Tracking.
- `SUPER_ADMIN`: Platform verification, audit logging, system metrics.
