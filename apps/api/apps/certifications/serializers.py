from rest_framework import serializers
from .models import *

class CertificationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CertificationsItem if 'certifications' != 'users' else User
        fields = '__all__'
