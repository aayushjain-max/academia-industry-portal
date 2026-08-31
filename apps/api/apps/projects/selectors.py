# Data query & selector layer for projects
from .models import *

def get_projects_list():
    return (ProjectsItem if 'projects' != 'users' else User).objects.all()
