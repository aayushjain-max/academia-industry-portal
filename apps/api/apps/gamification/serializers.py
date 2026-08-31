from rest_framework import serializers
from .models import *

class GamificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = GamificationItem if 'gamification' != 'users' else User
        fields = '__all__'
