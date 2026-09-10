from rest_framework import serializers
from .models import StudentProfile, StudentChatSession

class StudentProfileSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email', read_only=True)
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)

    class Meta:
        model = StudentProfile
        fields = [
            'id', 'email', 'first_name', 'last_name', 'student_type',
            'institution_name', 'roll_number', 'degree', 'department',
            'year_of_study', 'cgpa', 'headline', 'bio',
            'portfolio_slug', 'passport_hash',
            'resume_url', 'github_url', 'linkedin_url', 'portfolio_url',
            'guardian_consent_status', 'guardian_name', 'guardian_email',
            'guardian_confirmed_at',
            'created_at', 'updated_at'
        ]
        read_only_fields = [
            'id', 'guardian_token', 'guardian_consent_status',
            'guardian_confirmed_at', 'passport_hash', 'created_at', 'updated_at'
        ]


class StudentChatSessionSerializer(serializers.ModelSerializer):
    remaining_quota = serializers.SerializerMethodField()

    class Meta:
        model = StudentChatSession
        fields = [
            'id', 'messages', 'daily_count', 'daily_limit',
            'remaining_quota', 'last_reset_at', 'updated_at'
        ]
        read_only_fields = ['id', 'last_reset_at', 'updated_at']

    def get_remaining_quota(self, obj):
        return max(0, obj.daily_limit - obj.daily_count)


class PublicPortfolioSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email', read_only=True)
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)

    class Meta:
        model = StudentProfile
        fields = [
            'id', 'portfolio_slug', 'passport_hash', 'first_name', 'last_name',
            'email', 'institution_name', 'degree', 'department', 'year_of_study',
            'headline', 'bio', 'github_url', 'linkedin_url', 'portfolio_url',
            'created_at'
        ]
