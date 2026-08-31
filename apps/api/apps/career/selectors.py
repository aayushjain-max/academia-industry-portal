# Data query & selector layer for career
from .models import *

def get_career_list():
    return (CareerItem if 'career' != 'users' else User).objects.all()
