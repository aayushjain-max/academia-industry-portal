from rest_framework import serializers
from .models import Badge, UserGamification

class BadgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Badge
        fields = ['id', 'name', 'slug', 'icon', 'description', 'points_reward', 'category']

class UserGamificationSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.get_full_name', read_only=True)
    user_email = serializers.EmailField(source='user.email', read_only=True)
    badges = BadgeSerializer(many=True, read_only=True)

    class Meta:
        model = UserGamification
        fields = [
            'id', 'user', 'user_name', 'user_email', 'total_points',
            'current_level', 'rank', 'streak_days', 'badges', 'updated_at'
        ]
        read_only_fields = ['id', 'user', 'updated_at']

