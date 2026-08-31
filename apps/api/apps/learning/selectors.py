# Data query & selector layer for learning
from .models import *

def get_learning_list():
    return (LearningItem if 'learning' != 'users' else User).objects.all()
