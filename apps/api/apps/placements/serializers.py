from rest_framework import serializers
from .models import *

class PlacementsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlacementsItem if 'placements' != 'users' else User
        fields = '__all__'
