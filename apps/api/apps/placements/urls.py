from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PlacementsViewSet

router = DefaultRouter()
router.register(r'', PlacementsViewSet, basename='placements')

urlpatterns = [
    path('', include(router.urls)),
]
