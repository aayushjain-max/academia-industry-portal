# Data query & selector layer for skills
from .models import *

def get_skills_list():
    return (SkillsItem if 'skills' != 'users' else User).objects.all()
