# Data query & selector layer for mentorship
from .models import *

def get_mentorship_list():
    return (MentorshipItem if 'mentorship' != 'users' else User).objects.all()
