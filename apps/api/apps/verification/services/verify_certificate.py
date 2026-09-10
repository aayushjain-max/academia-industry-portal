import hmac
import hashlib
import json
from django.conf import settings
from typing import Dict, Any, Tuple

def _get_secret_salt() -> str:
    secret = getattr(settings, 'SECRET_KEY', None)
    if not secret:
        raise ValueError("SECRET_KEY must be configured for cryptographic verification.")
    return secret

def generate_cryptographic_hash(payload: Dict[str, Any]) -> str:
    """
    Generates a deterministic HMAC-SHA256 signature for a certificate/badge payload.
    """
    salt = _get_secret_salt()
    serialized = json.dumps(payload, sort_keys=True, default=str)
    return hmac.new(
        salt.encode('utf-8'),
        serialized.encode('utf-8'),
        hashlib.sha256
    ).hexdigest()

def verify_certificate_authenticity(record_data: Dict[str, Any], provided_signature: str) -> Tuple[bool, str]:
    """
    Verifies that the certificate payload has not been modified and matches the HMAC signature.
    """
    expected_sig = generate_cryptographic_hash(record_data)
    if hmac.compare_digest(expected_sig, provided_signature):
        return True, "Certificate signature verified successfully against cryptographic ledger."
    return False, "Signature mismatch. Certificate data may have been altered or tampered with."
