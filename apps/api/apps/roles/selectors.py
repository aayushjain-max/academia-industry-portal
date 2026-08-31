# Data query & selector layer for roles
from .models import *

def get_roles_list():
    return (RolesItem if 'roles' != 'users' else User).objects.all()
