from rest_framework import serializers
from .models import *

class LearningSerializer(serializers.ModelSerializer):
    class Meta:
        model = LearningItem if 'learning' != 'users' else User
        fields = '__all__'
