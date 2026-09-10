from rest_framework import serializers
from .models import Assessment, AssessmentQuestion, AssessmentAttempt

class AssessmentQuestionPublicSerializer(serializers.ModelSerializer):
    question_type = serializers.CharField(source='category', read_only=True)

    class Meta:
        model = AssessmentQuestion
        fields = ['id', 'question_text', 'question_type', 'category', 'skill_tag', 'options', 'difficulty', 'points', 'order']

class AssessmentSerializer(serializers.ModelSerializer):
    assessment_type = serializers.CharField(source='category', read_only=True)
    total_marks = serializers.IntegerField(source='total_questions', read_only=True)
    skills_assessed = serializers.ListField(source='skill_tags', read_only=True)
    questions_count = serializers.IntegerField(source='questions.count', read_only=True)

    class Meta:
        model = Assessment
        fields = [
            'id', 'title', 'slug', 'description', 'category', 'assessment_type',
            'duration_minutes', 'total_questions', 'total_marks', 'passing_score',
            'status', 'skill_tags', 'skills_assessed',
            'questions_count', 'created_at'
        ]

class AssessmentAttemptSerializer(serializers.ModelSerializer):
    assessment_title = serializers.CharField(source='assessment.title', read_only=True)
    assessment_type = serializers.CharField(source='assessment.category', read_only=True)
    score = serializers.FloatField(source='score_raw', read_only=True)
    percentage = serializers.FloatField(source='score_percentage', read_only=True)
    passed = serializers.SerializerMethodField()
    skill_breakdown = serializers.JSONField(source='topic_breakdown', read_only=True)

    class Meta:
        model = AssessmentAttempt
        fields = [
            'id', 'assessment', 'assessment_title', 'assessment_type',
            'student', 'status', 'score', 'score_raw', 'percentage', 'score_percentage',
            'passed', 'skill_breakdown', 'topic_breakdown', 'started_at', 'completed_at'
        ]
        read_only_fields = ['id', 'student', 'score', 'score_raw', 'percentage', 'score_percentage', 'passed', 'skill_breakdown', 'topic_breakdown', 'started_at', 'completed_at']

    def get_passed(self, obj):
        return obj.score_percentage >= obj.assessment.passing_score

