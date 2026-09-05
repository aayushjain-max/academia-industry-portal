from rest_framework import serializers
from .models import Project

class ProjectSerializer(serializers.ModelSerializer):
    skillsUsed = serializers.JSONField(source='skills_used', required=False)
    repoUrl = serializers.URLField(source='repo_url', required=False, allow_blank=True)
    liveDemoUrl = serializers.URLField(source='live_demo_url', required=False, allow_blank=True)
    mediaUrls = serializers.JSONField(source='media_urls', required=False)
    isVerified = serializers.BooleanField(source='is_verified', read_only=True)
    completionDate = serializers.DateField(source='completion_date', required=False, allow_null=True)
    student_name = serializers.CharField(source='student.user.get_full_name', read_only=True)

    class Meta:
        model = Project
        fields = [
            'id', 'student', 'student_name', 'title', 'description', 'project_type',
            'industry_partner', 'skillsUsed', 'repoUrl', 'liveDemoUrl',
            'mediaUrls', 'isVerified', 'completionDate', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'student', 'created_at', 'updated_at']

