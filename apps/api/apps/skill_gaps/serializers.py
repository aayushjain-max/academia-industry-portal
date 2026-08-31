from rest_framework import serializers
from .models import *

class SkillGapsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SkillGapsItem if 'skill_gaps' != 'users' else User
        fields = '__all__'
