from rest_framework import serializers
from .models import *

class InstitutionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstitutionsItem if 'institutions' != 'users' else User
        fields = '__all__'
