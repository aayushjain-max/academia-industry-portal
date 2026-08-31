# Data query & selector layer for internships
from .models import *

def get_internships_list():
    return (InternshipsItem if 'internships' != 'users' else User).objects.all()
