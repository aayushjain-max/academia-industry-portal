from rest_framework import serializers
from .models import *

class AuditSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuditItem if 'audit' != 'users' else User
        fields = '__all__'
