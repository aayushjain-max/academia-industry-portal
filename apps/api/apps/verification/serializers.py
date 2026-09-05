from rest_framework import serializers
from .models import VerificationRecord

class VerificationRecordSerializer(serializers.ModelSerializer):
    userId = serializers.CharField(source='user_id', read_only=True)
    userName = serializers.SerializerMethodField()
    recordType = serializers.CharField(source='record_type')
    verificationCode = serializers.CharField(source='verification_code')
    verifiedAt = serializers.DateTimeField(source='verified_at', read_only=True)

    class Meta:
        model = VerificationRecord
        fields = ['id', 'userId', 'userName', 'verificationCode', 'recordType', 'status', 'metadata', 'verifiedAt']

    def get_userName(self, obj):
        return f"{obj.user.first_name} {obj.user.last_name}".strip() or obj.user.username
