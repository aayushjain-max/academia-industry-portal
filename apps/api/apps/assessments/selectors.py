# Data query & selector layer for assessments
from .models import *

def get_assessments_list():
    return (AssessmentsItem if 'assessments' != 'users' else User).objects.all()
