from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CertificationsViewSet

router = DefaultRouter()
router.register(r'', CertificationsViewSet, basename='certifications')

urlpatterns = [
    path('', include(router.urls)),
]
