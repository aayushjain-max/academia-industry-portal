from rest_framework import serializers
from .models import *

class NotificationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotificationsItem if 'notifications' != 'users' else User
        fields = '__all__'
