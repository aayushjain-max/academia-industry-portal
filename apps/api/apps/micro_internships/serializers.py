from rest_framework import serializers
from .models import MicroInternship
from apps.skills.serializers import SkillSerializer

class MicroInternshipSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source='industry.company_name', read_only=True)
    required_skills_details = SkillSerializer(source='required_skills', many=True, read_only=True)

    class Meta:
        model = MicroInternship
        fields = [
            'id', 'industry', 'company_name', 'title', 'problem_statement',
            'deliverables', 'stipend', 'duration_days', 'required_skills',
            'required_skills_details', 'max_applicants', 'status',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'industry', 'created_at', 'updated_at']

