from rest_framework import serializers
from .models import InstitutionProfile

class InstitutionProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstitutionProfile
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'updated_at']

