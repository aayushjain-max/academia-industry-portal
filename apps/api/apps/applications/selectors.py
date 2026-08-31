# Data query & selector layer for applications
from .models import *

def get_applications_list():
    return (ApplicationsItem if 'applications' != 'users' else User).objects.all()
