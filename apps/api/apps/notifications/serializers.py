from rest_framework import serializers
from .models import Notification

class NotificationSerializer(serializers.ModelSerializer):
    userId = serializers.CharField(source='user_id', read_only=True)
    isRead = serializers.BooleanField(source='is_read', default=False)
    linkUrl = serializers.CharField(source='link_url', required=False, allow_null=True)
    createdAt = serializers.DateTimeField(source='created_at', read_only=True)

    class Meta:
        model = Notification
        fields = ['id', 'userId', 'title', 'message', 'type', 'channel', 'isRead', 'linkUrl', 'createdAt']
