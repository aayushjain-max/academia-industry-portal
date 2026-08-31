from rest_framework import serializers
from .models import *

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsersItem if 'users' != 'users' else User
        fields = '__all__'
