from rest_framework import serializers
from .models import *

class ApplicationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApplicationsItem if 'applications' != 'users' else User
        fields = '__all__'
