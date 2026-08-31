from rest_framework import serializers
from .models import *

class RolesSerializer(serializers.ModelSerializer):
    class Meta:
        model = RolesItem if 'roles' != 'users' else User
        fields = '__all__'
