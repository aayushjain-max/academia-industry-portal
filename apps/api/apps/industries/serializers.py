from rest_framework import serializers
from .models import *

class IndustriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = IndustriesItem if 'industries' != 'users' else User
        fields = '__all__'
