# Data query & selector layer for skill_passports
from .models import *

def get_skill_passports_list():
    return (SkillPassportsItem if 'skill_passports' != 'users' else User).objects.all()
