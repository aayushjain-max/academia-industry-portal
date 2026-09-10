from rest_framework import serializers
from .models import InternshipPosting
from apps.opportunities.serializers import OpportunitySerializer

class InternshipPostingSerializer(serializers.ModelSerializer):
    opportunity_details = OpportunitySerializer(source='opportunity', read_only=True)

    class Meta:
        model = InternshipPosting
        fields = [
            'id', 'opportunity', 'opportunity_details', 'internship_type',
            'weekly_hours', 'mentorship_provided', 'certificate_provided',
            'ppo_eligible', 'created_at', 'updated_at'
        ]

InternshipSerializer = InternshipPostingSerializer


