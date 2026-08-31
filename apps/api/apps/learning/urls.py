from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LearningViewSet

router = DefaultRouter()
router.register(r'', LearningViewSet, basename='learning')

urlpatterns = [
    path('', include(router.urls)),
]
