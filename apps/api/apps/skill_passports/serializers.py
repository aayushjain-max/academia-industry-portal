from rest_framework import serializers
from .models import *

class SkillPassportsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SkillPassportsItem if 'skill_passports' != 'users' else User
        fields = '__all__'
