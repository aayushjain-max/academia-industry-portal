# Data query & selector layer for placements
from .models import *

def get_placements_list():
    return (PlacementsItem if 'placements' != 'users' else User).objects.all()
