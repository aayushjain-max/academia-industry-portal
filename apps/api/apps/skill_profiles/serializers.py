from rest_framework import serializers
from .models import SkillProfile

class SkillProfileSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.user.get_full_name', read_only=True)
    student_email = serializers.EmailField(source='student.user.email', read_only=True)

    class Meta:
        model = SkillProfile
        fields = [
            'id', 'student', 'student_name', 'student_email',
            'overall_score', 'technical_score', 'soft_skill_score',
            'domain_score', 'strengths', 'weaknesses', 'domain_breakdown',
            'profile_summary', 'verified_skills_count', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'student', 'created_at', 'updated_at']

