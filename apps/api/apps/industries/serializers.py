from rest_framework import serializers
from .models import IndustryProfile

class IndustryProfileSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email', read_only=True)
    contact_person = serializers.CharField(source='user.get_full_name', read_only=True)

    class Meta:
        model = IndustryProfile
        fields = [
            'id', 'email', 'contact_person',
            'company_name', 'website', 'industry_sector', 'company_size',
            'headquarters', 'description', 'is_verified',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'is_verified', 'created_at', 'updated_at']

