from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import IndustriesViewSet

router = DefaultRouter()
router.register(r'', IndustriesViewSet, basename='industries')

urlpatterns = [
    path('', include(router.urls)),
]
