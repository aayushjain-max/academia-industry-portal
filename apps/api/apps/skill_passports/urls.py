from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SkillPassportViewSet

router = DefaultRouter()
router.register(r'', SkillPassportViewSet, basename='skill-passports')


urlpatterns = [
    path('', include(router.urls)),
]
