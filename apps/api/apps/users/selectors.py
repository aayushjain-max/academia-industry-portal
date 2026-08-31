# Data query & selector layer for users
from .models import *

def get_users_list():
    return (UsersItem if 'users' != 'users' else User).objects.all()
