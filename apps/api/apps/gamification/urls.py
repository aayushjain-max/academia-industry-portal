from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LeaderboardViewSet, BadgeViewSet

router = DefaultRouter()
router.register(r'leaderboard', LeaderboardViewSet, basename='leaderboard')
router.register(r'badges', BadgeViewSet, basename='badges')
router.register(r'', LeaderboardViewSet, basename='gamification')


urlpatterns = [
    path('', include(router.urls)),
]
