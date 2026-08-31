# Data query & selector layer for audit
from .models import *

def get_audit_list():
    return (AuditItem if 'audit' != 'users' else User).objects.all()
