from rest_framework import serializers
from .models import *

class CareerSerializer(serializers.ModelSerializer):
    class Meta:
        model = CareerItem if 'career' != 'users' else User
        fields = '__all__'
