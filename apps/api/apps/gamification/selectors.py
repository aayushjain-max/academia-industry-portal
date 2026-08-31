# Data query & selector layer for gamification
from .models import *

def get_gamification_list():
    return (GamificationItem if 'gamification' != 'users' else User).objects.all()
