from rest_framework import serializers
from .models import Assessment, AssessmentQuestion, AssessmentAttempt
from apps.skills.serializers import SkillSerializer

class AssessmentQuestionPublicSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssessmentQuestion
        fields = ['id', 'question_text', 'question_type', 'options', 'points', 'order']

class AssessmentSerializer(serializers.ModelSerializer):
    skills_assessed_details = SkillSerializer(source='skills_assessed', many=True, read_only=True)
    questions_count = serializers.IntegerField(source='questions.count', read_only=True)

    class Meta:
        model = Assessment
        fields = [
            'id', 'title', 'description', 'assessment_type',
            'duration_minutes', 'total_marks', 'passing_score',
            'status', 'skills_assessed', 'skills_assessed_details',
            'questions_count', 'created_at'
        ]

class AssessmentAttemptSerializer(serializers.ModelSerializer):
    assessment_title = serializers.CharField(source='assessment.title', read_only=True)
    assessment_type = serializers.CharField(source='assessment.assessment_type', read_only=True)

    class Meta:
        model = AssessmentAttempt
        fields = [
            'id', 'assessment', 'assessment_title', 'assessment_type',
            'student', 'status', 'score', 'percentage', 'passed',
            'skill_breakdown', 'started_at', 'completed_at'
        ]
        read_only_fields = ['id', 'student', 'score', 'percentage', 'passed', 'skill_breakdown', 'started_at', 'completed_at']

