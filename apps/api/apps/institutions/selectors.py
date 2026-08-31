# Data query & selector layer for institutions
from .models import *

def get_institutions_list():
    return (InstitutionsItem if 'institutions' != 'users' else User).objects.all()
