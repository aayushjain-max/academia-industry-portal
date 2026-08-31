from rest_framework import serializers
from .models import *

class StudentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentsItem if 'students' != 'users' else User
        fields = '__all__'
