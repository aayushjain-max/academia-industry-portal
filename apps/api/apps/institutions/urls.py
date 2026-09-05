from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import InstitutionProfileViewSet

router = DefaultRouter()
router.register(r'', InstitutionProfileViewSet, basename='institutions')


urlpatterns = [
    path('', include(router.urls)),
]
