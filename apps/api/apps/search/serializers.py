from rest_framework import serializers
from .models import *

class SearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = SearchItem if 'search' != 'users' else User
        fields = '__all__'
