# Data query & selector layer for certifications
from .models import *

def get_certifications_list():
    return (CertificationsItem if 'certifications' != 'users' else User).objects.all()
