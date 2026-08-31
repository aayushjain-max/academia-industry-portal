# Data query & selector layer for academicians
from .models import *

def get_academicians_list():
    return (AcademiciansItem if 'academicians' != 'users' else User).objects.all()
