from rest_framework import serializers
from .models import *

class DocumentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocumentsItem if 'documents' != 'users' else User
        fields = '__all__'
