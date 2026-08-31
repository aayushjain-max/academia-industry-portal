# Data query & selector layer for documents
from .models import *

def get_documents_list():
    return (DocumentsItem if 'documents' != 'users' else User).objects.all()
