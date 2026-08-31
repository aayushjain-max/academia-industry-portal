import hashlib

def hash_payload(data: str) -> str:
    return hashlib.sha256(data.encode('utf-8')).hexdigest()
