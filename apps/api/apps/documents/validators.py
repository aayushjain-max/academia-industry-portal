import os
from rest_framework.exceptions import ValidationError

ALLOWED_MIME_TYPES = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/webp',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
]

ALLOWED_EXTENSIONS = ['.pdf', '.jpg', '.jpeg', '.png', '.webp', '.docx', '.doc']
MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024  # 10 MB

def validate_uploaded_file(file_obj):
    """Validates file size, extension, and mime-type."""
    if not file_obj:
        raise ValidationError("No file provided.")
    
    if file_obj.size > MAX_FILE_SIZE_BYTES:
        raise ValidationError(f"File size ({file_obj.size} bytes) exceeds maximum limit of 10MB.")

    ext = os.path.splitext(file_obj.name)[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise ValidationError(f"File extension '{ext}' is not allowed. Allowed: {ALLOWED_EXTENSIONS}")

    content_type = getattr(file_obj, 'content_type', '').lower()
    if content_type and content_type not in ALLOWED_MIME_TYPES:
        raise ValidationError(f"MIME type '{content_type}' is not permitted.")

    return True

def validate_documents_input(data):
    if not isinstance(data, dict):
        raise ValidationError("Document payload must be a JSON object.")
    return True
