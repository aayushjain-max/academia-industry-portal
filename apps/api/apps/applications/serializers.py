from rest_framework import serializers
from .models import Application

class ApplicationSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.user.get_full_name', read_only=True)
    student_email = serializers.EmailField(source='student.user.email', read_only=True)
    opportunity_title = serializers.CharField(source='opportunity.title', read_only=True)
    company_name = serializers.CharField(source='opportunity.industry.company_name', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = Application
        fields = [
            'id', 'student', 'student_name', 'student_email',
            'opportunity', 'opportunity_title', 'company_name',
            'status', 'status_display',
            'cover_letter', 'resume_url', 'feedback',
            'applied_at', 'updated_at'
        ]
        # Enforce server-controlled status: status cannot be manipulated directly via normal POST/PUT/PATCH
        read_only_fields = ['id', 'student', 'status', 'applied_at', 'updated_at']
