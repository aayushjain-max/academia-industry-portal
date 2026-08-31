# Data query & selector layer for search
from .models import *

def get_search_list():
    return (SearchItem if 'search' != 'users' else User).objects.all()
