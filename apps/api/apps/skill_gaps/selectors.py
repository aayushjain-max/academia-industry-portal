# Data query & selector layer for skill_gaps
from .models import *

def get_skill_gaps_list():
    return (SkillGapsItem if 'skill_gaps' != 'users' else User).objects.all()
