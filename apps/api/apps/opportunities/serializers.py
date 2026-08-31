from rest_framework import serializers
from .models import *

class OpportunitiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = OpportunitiesItem if 'opportunities' != 'users' else User
        fields = '__all__'
