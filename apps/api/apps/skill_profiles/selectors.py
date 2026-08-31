# Data query & selector layer for skill_profiles
from .models import *

def get_skill_profiles_list():
    return (SkillProfilesItem if 'skill_profiles' != 'users' else User).objects.all()
