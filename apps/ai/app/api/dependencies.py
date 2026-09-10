import os
import time
import json
import hmac
import hashlib
import base64
from fastapi import Security, HTTPException, status, Header
from fastapi.security import APIKeyHeader, HTTPBearer, HTTPAuthorizationCredentials
from app.config.settings import settings

API_KEY_HEADER = APIKeyHeader(name="X-Internal-Service-Key", auto_error=False)
http_bearer = HTTPBearer(auto_error=False)

def get_ai_settings():
    return settings

def _verify_jwt_token(token: str) -> bool:
    try:
        parts = token.split(".")
        if len(parts) != 3:
            return False

        header_b64, payload_b64, signature_b64 = parts
        signing_input = f"{header_b64}.{payload_b64}".encode("utf-8")

        # Decode actual signature
        padding = "=" * ((4 - len(signature_b64) % 4) % 4)
        actual_sig = base64.urlsafe_b64decode(signature_b64 + padding)

        # Candidate secret keys from configuration
        secrets = [s for s in [settings.JWT_SECRET_KEY, settings.SECRET_KEY, os.getenv("JWT_SECRET_KEY"), os.getenv("SECRET_KEY")] if s]
        if not secrets:
            if settings.ENVIRONMENT.lower() == "production":
                return False
            secrets = ["dev-insecure-local-only-key"]

        valid_sig = False
        for sec in secrets:
            expected_sig = hmac.new(sec.encode("utf-8"), signing_input, hashlib.sha256).digest()
            if hmac.compare_digest(expected_sig, actual_sig):
                valid_sig = True
                break

        if not valid_sig:
            return False

        # Verify expiration
        payload_pad = "=" * ((4 - len(payload_b64) % 4) % 4)
        payload = json.loads(base64.urlsafe_b64decode(payload_b64 + payload_pad).decode("utf-8"))
        if "exp" in payload and payload["exp"] < time.time():
            return False

        return True
    except Exception:
        return False

async def verify_service_auth(
    api_key: str = Security(API_KEY_HEADER),
    bearer: HTTPAuthorizationCredentials = Security(http_bearer),
):
    """
    Authenticates requests to the AI microservice via:
    1. Internal service API key (X-Internal-Service-Key), OR
    2. Valid cryptographically verified Bearer Token (Authorization: Bearer <jwt>).
    """
    expected_key = settings.INTERNAL_SERVICE_KEY or os.getenv("INTERNAL_SERVICE_KEY")
    
    # 1. Check API Key header
    if api_key and expected_key and hmac.compare_digest(api_key, expected_key):
        return True

    # 2. Check Cryptographically Verified Bearer token
    if bearer and bearer.credentials:
        if _verify_jwt_token(bearer.credentials):
            return True

    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid or missing service authentication credentials for AI microservice.",
        headers={"WWW-Authenticate": "Bearer"},
    )


