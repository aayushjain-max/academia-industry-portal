from rest_framework import serializers
from .models import Opportunity
from apps.skills.serializers import SkillSerializer

class OpportunitySerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source='industry.company_name', read_only=True)
    company_website = serializers.URLField(source='industry.website', read_only=True)
    skills_detail = SkillSerializer(source='required_skills', many=True, read_only=True)
    opportunity_type_display = serializers.CharField(source='get_opportunity_type_display', read_only=True)
    industry_detail = serializers.SerializerMethodField()
    mode = serializers.SerializerMethodField()
    stipend_salary = serializers.CharField(source='stipend_or_salary', read_only=True)

    class Meta:
        model = Opportunity
        fields = [
            'id', 'company_name', 'company_website', 'title',
            'opportunity_type', 'opportunity_type_display',
            'description', 'location', 'is_remote', 'mode', 'stipend_or_salary', 'stipend_salary',
            'required_skills', 'skills_detail', 'industry_detail', 'application_deadline',
            'status', 'openings_count', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def get_industry_detail(self, obj):
        if not obj.industry:
            return None
        return {
            'id': str(obj.industry.id),
            'company_name': obj.industry.company_name,
            'website': obj.industry.website,
            'industry_sector': obj.industry.industry_sector,
            'is_verified': obj.industry.is_verified,
        }

    def get_mode(self, obj):
        return 'remote' if obj.is_remote else 'hybrid'

    def to_representation(self, instance):
        data = super().to_representation(instance)
        # Populate nested industry for frontend compatibility
        data['industry'] = data.get('industry_detail')
        return data


