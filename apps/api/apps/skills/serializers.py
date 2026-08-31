from rest_framework import serializers
from .models import *

class SkillsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SkillsItem if 'skills' != 'users' else User
        fields = '__all__'
