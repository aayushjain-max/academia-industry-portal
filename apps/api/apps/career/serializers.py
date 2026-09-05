from rest_framework import serializers
from .models import CareerPath, CareerReadinessScore, ActionPlan

class CareerPathSerializer(serializers.ModelSerializer):
    salaryRange = serializers.JSONField(source='salary_range')
    growthProjection = serializers.CharField(source='growth_projection')
    coreSkills = serializers.JSONField(source='core_skills')
    recommendedSteps = serializers.JSONField(source='recommended_steps')

    class Meta:
        model = CareerPath
        fields = [
            'id', 'title', 'description', 'industry',
            'salaryRange', 'growthProjection', 'coreSkills', 'recommendedSteps'
        ]

class CareerReadinessScoreSerializer(serializers.ModelSerializer):
    userId = serializers.CharField(source='student.user.id', read_only=True)
    overallScore = serializers.IntegerField(source='overall_score')
    technicalScore = serializers.IntegerField(source='technical_score')
    softSkillScore = serializers.IntegerField(source='soft_skill_score')
    projectScore = serializers.IntegerField(source='project_score')
    certificationScore = serializers.IntegerField(source='certification_score')
    experienceScore = serializers.IntegerField(source='experience_score')
    calculatedAt = serializers.DateTimeField(source='calculated_at', read_only=True)

    class Meta:
        model = CareerReadinessScore
        fields = [
            'id', 'userId', 'overallScore', 'technicalScore',
            'softSkillScore', 'projectScore', 'certificationScore',
            'experienceScore', 'explanation', 'calculatedAt'
        ]

class ActionPlanSerializer(serializers.ModelSerializer):
    userId = serializers.CharField(source='student.user.id', read_only=True)
    targetRole = serializers.CharField(source='target_role')
    skillGap = serializers.CharField(source='skill_gap')
    createdAt = serializers.DateTimeField(source='created_at', read_only=True)
    updatedAt = serializers.DateTimeField(source='updated_at', read_only=True)

    class Meta:
        model = ActionPlan
        fields = [
            'id', 'userId', 'targetRole', 'skillGap',
            'priority', 'steps', 'createdAt', 'updatedAt'
        ]

