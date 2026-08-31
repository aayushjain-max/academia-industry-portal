# Data query & selector layer for opportunities
from .models import *

def get_opportunities_list():
    return (OpportunitiesItem if 'opportunities' != 'users' else User).objects.all()
