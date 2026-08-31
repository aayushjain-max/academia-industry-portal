from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SkillProfilesViewSet

router = DefaultRouter()
router.register(r'', SkillProfilesViewSet, basename='skill_profiles')

urlpatterns = [
    path('', include(router.urls)),
]
