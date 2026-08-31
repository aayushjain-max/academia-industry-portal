# Data query & selector layer for authentication
from .models import *

def get_authentication_list():
    return (AuthenticationItem if 'authentication' != 'users' else User).objects.all()
