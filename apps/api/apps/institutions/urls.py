from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import InstitutionsViewSet

router = DefaultRouter()
router.register(r'', InstitutionsViewSet, basename='institutions')

urlpatterns = [
    path('', include(router.urls)),
]
