from rest_framework import serializers
from .models import RoleDefinition

class RoleDefinitionSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoleDefinition
        fields = '__all__'

