import re
from django.core.exceptions import ValidationError

def validate_phone_number(value):
    if value and not re.match(r'^\+?[1-9]\d{7,14}$', value):
        raise ValidationError('Invalid phone number format.')
