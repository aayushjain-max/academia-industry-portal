# Data query & selector layer for analytics
from .models import *

def get_analytics_list():
    return (AnalyticsItem if 'analytics' != 'users' else User).objects.all()
