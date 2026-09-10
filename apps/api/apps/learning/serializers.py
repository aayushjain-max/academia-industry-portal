from rest_framework import serializers
from .models import LearningResource, UserLearningProgress, IndustryTraining
from apps.skills.serializers import SkillSerializer

class LearningResourceSerializer(serializers.ModelSerializer):
    skillsTargeted = serializers.SerializerMethodField()

    class Meta:
        model = LearningResource
        fields = [
            'id', 'title', 'provider', 'type', 'url',
            'duration_hours', 'difficulty', 'rating', 'skills_targeted',
            'skillsTargeted', 'created_at'
        ]

    def get_skillsTargeted(self, obj):
        return [s.name for s in obj.skills_targeted.all()]

class UserLearningProgressSerializer(serializers.ModelSerializer):
    resource_title = serializers.CharField(source='resource.title', read_only=True)
    provider = serializers.CharField(source='resource.provider', read_only=True)
    url = serializers.URLField(source='resource.url', read_only=True)

    class Meta:
        model = UserLearningProgress
        fields = [
            'id', 'student', 'resource', 'resource_title', 'provider',
            'url', 'progress_percentage', 'status', 'started_at', 'completed_at'
        ]
        read_only_fields = ['id', 'student', 'started_at']

class IndustryTrainingSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source='industry.company_name', read_only=True)

    class Meta:
        model = IndustryTraining
        fields = [
            'id', 'industry', 'company_name', 'title', 'description',
            'syllabus', 'duration_weeks', 'mode', 'schedule',
            'max_participants', 'is_active', 'created_at'
        ]
        read_only_fields = ['id', 'industry', 'created_at']

LearningPathSerializer = LearningResourceSerializer


