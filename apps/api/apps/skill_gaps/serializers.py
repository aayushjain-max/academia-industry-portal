from rest_framework import serializers
from .models import SkillGapAnalysis

class SkillGapAnalysisSerializer(serializers.ModelSerializer):
    class Meta:
        model = SkillGapAnalysis
        fields = '__all__'
        read_only_fields = ['id', 'student', 'analyzed_at']

