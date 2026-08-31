# Data query & selector layer for notifications
from .models import *

def get_notifications_list():
    return (NotificationsItem if 'notifications' != 'users' else User).objects.all()
