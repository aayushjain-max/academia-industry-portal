from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Badge, UserGamification
from .serializers import BadgeSerializer, UserGamificationSerializer

class BadgeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Badge.objects.all()
    serializer_class = BadgeSerializer
    permission_classes = [permissions.AllowAny]

class LeaderboardViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = UserGamification.objects.select_related('user').prefetch_related('badges').all().order_by('-total_points')
    serializer_class = UserGamificationSerializer
    permission_classes = [permissions.AllowAny]

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def my_stats(self, request):
        gamification, created = UserGamification.objects.get_or_create(
            user=request.user,
            defaults={'total_points': 250, 'streak_days': 5}
        )

        # Calculate rank dynamically
        higher_count = UserGamification.objects.filter(total_points__gt=gamification.total_points).count()
        gamification.rank = higher_count + 1
        gamification.save(update_fields=['rank', 'current_level'])

        serializer = self.get_serializer(gamification)
        return Response(serializer.data)

