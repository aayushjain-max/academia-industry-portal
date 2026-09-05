from rest_framework import serializers
from .models import AcademicianProfile

class AcademicianProfileSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email', read_only=True)
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)

    class Meta:
        model = AcademicianProfile
        fields = [
            'id', 'user', 'email', 'first_name', 'last_name',
            'institution_name', 'department', 'designation',
            'qualifications', 'experience_years', 'areas_of_expertise',
            'publications', 'research_interests', 'industry_training_interests',
            'consultancy_areas', 'bio', 'is_verified', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'user', 'created_at', 'updated_at']

