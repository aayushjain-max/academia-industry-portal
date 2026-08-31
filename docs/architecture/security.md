# Security, Privacy & Compliance

- **Authentication**: JWT with short expiration (60m) and refresh token rotation (7d).
- **Transport Security**: TLS 1.3 enforced, HSTS, Secure Cookies, Strict CSP.
- **File Storage**: Pre-signed URLs with MIME type and size validation before S3 ingestion.
- **Audit Trails**: Non-repudiable transaction logging stored in PostgreSQL.
