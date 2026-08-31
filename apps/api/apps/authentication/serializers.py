from rest_framework import serializers
from .models import *

class AuthenticationSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthenticationItem if 'authentication' != 'users' else User
        fields = '__all__'
