from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SkillGapsViewSet

router = DefaultRouter()
router.register(r'', SkillGapsViewSet, basename='skill_gaps')

urlpatterns = [
    path('', include(router.urls)),
]
