from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CertificationViewSet

router = DefaultRouter()
router.register(r'', CertificationViewSet, basename='certifications')


urlpatterns = [
    path('', include(router.urls)),
]
