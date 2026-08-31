from rest_framework import serializers
from .models import *

class VerificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = VerificationItem if 'verification' != 'users' else User
        fields = '__all__'
