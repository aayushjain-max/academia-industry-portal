from rest_framework import serializers
from .models import *

class AssessmentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssessmentsItem if 'assessments' != 'users' else User
        fields = '__all__'
