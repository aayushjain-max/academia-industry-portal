from typing import Dict, Any, Tuple
from .verify_certificate import generate_cryptographic_hash, verify_certificate_authenticity

def verify_skill_passport_entry(skill_data: Dict[str, Any], signature: str) -> Tuple[bool, str]:
    """
    Validates cryptographic proof for a Skill Passport competency entry.
    """
    return verify_certificate_authenticity(skill_data, signature)
