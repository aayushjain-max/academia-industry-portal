from rest_framework import serializers
from .models import Opportunity
from apps.skills.serializers import SkillSerializer

class OpportunitySerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source='industry.company_name', read_only=True)
    company_website = serializers.URLField(source='industry.website', read_only=True)
    skills_detail = SkillSerializer(source='required_skills', many=True, read_only=True)
    opportunity_type_display = serializers.CharField(source='get_opportunity_type_display', read_only=True)

    class Meta:
        model = Opportunity
        fields = [
            'id', 'company_name', 'company_website', 'title',
            'opportunity_type', 'opportunity_type_display',
            'description', 'location', 'is_remote', 'stipend_or_salary',
            'required_skills', 'skills_detail', 'application_deadline',
            'status', 'openings_count', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

