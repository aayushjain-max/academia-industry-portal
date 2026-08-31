# Data query & selector layer for micro_internships
from .models import *

def get_micro_internships_list():
    return (MicroInternshipsItem if 'micro_internships' != 'users' else User).objects.all()
