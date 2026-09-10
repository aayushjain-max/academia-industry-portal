from rest_framework import serializers
from .models import DigitalPortfolio
from apps.skills.serializers import StudentSkillSerializer
from apps.projects.serializers import ProjectSerializer
from apps.certifications.serializers import CertificationSerializer

class DigitalPortfolioSerializer(serializers.ModelSerializer):
    class Meta:
        model = DigitalPortfolio
        fields = [
            'id', 'student', 'username', 'custom_theme',
            'achievements', 'is_public', 'views_count',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'student', 'views_count', 'created_at', 'updated_at']

class PublicPortfolioSerializer(serializers.Serializer):
    username = serializers.CharField()
    fullName = serializers.CharField()
    headline = serializers.CharField(allow_blank=True)
    bio = serializers.CharField(allow_blank=True)
    location = serializers.CharField(allow_blank=True)
    skills = StudentSkillSerializer(many=True)
    projects = ProjectSerializer(many=True)
    certifications = CertificationSerializer(many=True)
    achievements = serializers.ListField(child=serializers.CharField())
    isPublic = serializers.BooleanField()

PortfolioSerializer = DigitalPortfolioSerializer


