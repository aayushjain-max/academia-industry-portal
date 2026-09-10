from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Badge, UserGamification
from .serializers import BadgeSerializer, UserGamificationSerializer
from apps.applications.models import Application
from apps.certifications.models import Certification
from apps.projects.models import Project

class BadgeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Badge.objects.all()
    serializer_class = BadgeSerializer
    permission_classes = [permissions.IsAuthenticated]

class LeaderboardViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = UserGamification.objects.select_related('user').prefetch_related('badges').all().order_by('-total_points')
    serializer_class = UserGamificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['get'], url_path='my-stats', permission_classes=[permissions.IsAuthenticated])
    def my_stats(self, request):
        user = request.user
        gamification, created = UserGamification.objects.get_or_create(
            user=user,
            defaults={'total_points': 0, 'streak_days': 1}
        )

        # Dynamic point calculation from real platform activity:
        # Applications submitted (+10 pts each)
        # Certifications added (+50 pts each)
        # Projects added (+75 pts each)
        if hasattr(user, 'student_profile'):
            sp = user.student_profile
            app_points = Application.objects.filter(student=sp).count() * 10
            cert_points = Certification.objects.filter(student=sp).count() * 50
            proj_points = Project.objects.filter(student=sp).count() * 75
            computed_total = max(gamification.total_points, app_points + cert_points + proj_points)
            gamification.total_points = computed_total

        # Compute rank dynamically
        higher_count = UserGamification.objects.filter(total_points__gt=gamification.total_points).count()
        gamification.rank = higher_count + 1
        gamification.save(update_fields=['total_points', 'rank', 'current_level'])

        serializer = self.get_serializer(gamification)
        return Response(serializer.data, status=status.HTTP_200_OK)
