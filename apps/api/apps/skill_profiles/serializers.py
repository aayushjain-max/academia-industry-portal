from rest_framework import serializers
from .models import *

class SkillProfilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = SkillProfilesItem if 'skill_profiles' != 'users' else User
        fields = '__all__'
