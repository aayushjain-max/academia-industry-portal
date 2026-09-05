from rest_framework import serializers
from .models import SkillPassport

class SkillPassportSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.user.get_full_name', read_only=True)
    student_email = serializers.EmailField(source='student.user.email', read_only=True)
    institution = serializers.CharField(source='student.institution_name', read_only=True)
    degree = serializers.CharField(source='student.degree', read_only=True)

    class Meta:
        model = SkillPassport
        fields = [
            'id', 'student', 'student_name', 'student_email',
            'institution', 'degree', 'passport_number', 'qr_code_payload',
            'verified_credentials_snapshot', 'cryptographic_signature',
            'is_valid', 'issued_at', 'updated_at'
        ]
        read_only_fields = [
            'id', 'student', 'passport_number', 'qr_code_payload',
            'cryptographic_signature', 'is_valid', 'issued_at', 'updated_at'
        ]

