from rest_framework import serializers
from .models import *

class ProjectsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectsItem if 'projects' != 'users' else User
        fields = '__all__'
