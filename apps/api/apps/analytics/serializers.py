from rest_framework import serializers
from .models import *

class AnalyticsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnalyticsItem if 'analytics' != 'users' else User
        fields = '__all__'
