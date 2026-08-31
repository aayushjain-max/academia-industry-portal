from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SkillsViewSet

router = DefaultRouter()
router.register(r'', SkillsViewSet, basename='skills')

urlpatterns = [
    path('', include(router.urls)),
]
