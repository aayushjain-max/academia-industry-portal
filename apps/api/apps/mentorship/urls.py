from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MentorshipProfileViewSet, MentorshipSessionViewSet

router = DefaultRouter()
router.register(r'sessions', MentorshipSessionViewSet, basename='mentorship-sessions')
router.register(r'mentors', MentorshipProfileViewSet, basename='mentors')
router.register(r'', MentorshipProfileViewSet, basename='mentorship')


urlpatterns = [
    path('', include(router.urls)),
]
