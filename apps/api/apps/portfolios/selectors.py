# Data query & selector layer for portfolios
from .models import *

def get_portfolios_list():
    return (PortfoliosItem if 'portfolios' != 'users' else User).objects.all()
