from rest_framework import serializers
from .models import AuditLog

class AuditLogSerializer(serializers.ModelSerializer):
    userEmail = serializers.EmailField(source='user.email', read_only=True, allow_null=True)

    class Meta:
        model = AuditLog
        fields = ['id', 'userEmail', 'action', 'resource_type', 'resource_id', 'ip_address', 'extra_data', 'timestamp']
