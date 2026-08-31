from rest_framework import serializers
from .models import *

class AcademiciansSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademiciansItem if 'academicians' != 'users' else User
        fields = '__all__'
