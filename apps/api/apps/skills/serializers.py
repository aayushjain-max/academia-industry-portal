from rest_framework import serializers
from .models import Skill, StudentSkill

class SkillSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source='get_category_display', read_only=True)

    class Meta:
        model = Skill
        fields = ['id', 'name', 'slug', 'category', 'category_display', 'description', 'created_at']
        read_only_fields = ['id', 'slug', 'created_at']

class StudentSkillSerializer(serializers.ModelSerializer):
    skill_name = serializers.CharField(source='skill.name', read_only=True)
    skill_category = serializers.CharField(source='skill.get_category_display', read_only=True)

    class Meta:
        model = StudentSkill
        fields = ['id', 'skill', 'skill_name', 'skill_category', 'proficiency', 'is_verified', 'verified_score', 'created_at']
        read_only_fields = ['id', 'is_verified', 'verified_score', 'created_at']

