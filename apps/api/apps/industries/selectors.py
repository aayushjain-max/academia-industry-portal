# Data query & selector layer for industries
from .models import *

def get_industries_list():
    return (IndustriesItem if 'industries' != 'users' else User).objects.all()
