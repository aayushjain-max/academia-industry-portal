from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AuthenticationViewSet

router = DefaultRouter()
router.register(r'', AuthenticationViewSet, basename='authentication')

urlpatterns = [
    path('', include(router.urls)),
]
