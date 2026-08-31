from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AssessmentsViewSet

router = DefaultRouter()
router.register(r'', AssessmentsViewSet, basename='assessments')

urlpatterns = [
    path('', include(router.urls)),
]
