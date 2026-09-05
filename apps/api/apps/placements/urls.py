from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PlacementDriveViewSet, PlacementRecordViewSet

router = DefaultRouter()
router.register(r'records', PlacementRecordViewSet, basename='placement-records')
router.register(r'', PlacementDriveViewSet, basename='placement-drives')


urlpatterns = [
    path('', include(router.urls)),
]
