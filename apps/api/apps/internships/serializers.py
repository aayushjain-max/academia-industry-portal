from rest_framework import serializers
from .models import *

class InternshipsSerializer(serializers.ModelSerializer):
    class Meta:
        model = InternshipsItem if 'internships' != 'users' else User
        fields = '__all__'
