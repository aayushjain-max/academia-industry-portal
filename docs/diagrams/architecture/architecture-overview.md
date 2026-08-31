# Architecture Overview Diagram

```mermaid
graph LR
    User[User Browser] --> Nginx[Nginx]
    Nginx --> Web[Next.js App]
    Nginx --> API[Django REST API]
    Nginx --> AI[FastAPI AI]
    API --> DB[(PostgreSQL)]
    API --> Cache[(Redis)]
```
