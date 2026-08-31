from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PortfoliosViewSet

router = DefaultRouter()
router.register(r'', PortfoliosViewSet, basename='portfolios')

urlpatterns = [
    path('', include(router.urls)),
]
