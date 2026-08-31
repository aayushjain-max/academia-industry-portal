# Data query & selector layer for verification
from .models import *

def get_verification_list():
    return (VerificationItem if 'verification' != 'users' else User).objects.all()
