from rest_framework import serializers
from .models import *

class MentorshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = MentorshipItem if 'mentorship' != 'users' else User
        fields = '__all__'
