from rest_framework import serializers
from .models import *

class MicroInternshipsSerializer(serializers.ModelSerializer):
    class Meta:
        model = MicroInternshipsItem if 'micro_internships' != 'users' else User
        fields = '__all__'
