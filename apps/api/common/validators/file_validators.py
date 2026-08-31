from django.core.exceptions import ValidationError

def validate_document_size(file):
    max_size_mb = 10
    if file.size > max_size_mb * 1024 * 1024:
        raise ValidationError(f"File size exceeds maximum allowed limit of {max_size_mb} MB.")
