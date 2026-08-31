# Backend Architecture (Django REST Framework)

- Service-Selector pattern decoupling business logic from views and serializers.
- Authentication: JWT access tokens with rotation and blacklist via Redis.
- Asynchronous Task Queue: Celery with Redis for notifications, AI orchestration, and bulk indexing.
- Multi-tenancy & Object-Level RBAC: Granular custom permissions for all stakeholder actions.
