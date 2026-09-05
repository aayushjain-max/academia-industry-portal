from rest_framework import serializers
from .models import Certification

class CertificationSerializer(serializers.ModelSerializer):
    issuingOrganization = serializers.CharField(source='issuing_organization')
    issueDate = serializers.DateField(source='issue_date')
    expiryDate = serializers.DateField(source='expiry_date', required=False, allow_null=True)
    credentialId = serializers.CharField(source='credential_id', required=False, allow_blank=True)
    credentialUrl = serializers.URLField(source='credential_url', required=False, allow_blank=True)
    verificationStatus = serializers.CharField(source='verification_status', read_only=True)
    skillsCovered = serializers.JSONField(source='skills_covered', required=False)

    class Meta:
        model = Certification
        fields = [
            'id', 'student', 'title', 'issuingOrganization', 'issueDate',
            'expiryDate', 'credentialId', 'credentialUrl', 'verificationStatus',
            'skillsCovered', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'student', 'created_at', 'updated_at']

