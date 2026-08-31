from rest_framework import serializers
from .models import *

class PortfoliosSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfoliosItem if 'portfolios' != 'users' else User
        fields = '__all__'
