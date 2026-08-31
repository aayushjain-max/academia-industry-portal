# Data query & selector layer for students
from .models import *

def get_students_list():
    return (StudentsItem if 'students' != 'users' else User).objects.all()
