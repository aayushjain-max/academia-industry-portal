from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import IndustryProfileViewSet

router = DefaultRouter()
router.register(r'', IndustryProfileViewSet, basename='industries')

urlpatterns = [
    path('', include(router.urls)),
]

