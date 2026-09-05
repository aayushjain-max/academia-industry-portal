from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SkillViewSet, StudentSkillViewSet

router = DefaultRouter()
router.register(r'my-skills', StudentSkillViewSet, basename='my-skills')
router.register(r'', SkillViewSet, basename='skills')

urlpatterns = [
    path('', include(router.urls)),
]

