from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DigitalPortfolioViewSet

router = DefaultRouter()
router.register(r'', DigitalPortfolioViewSet, basename='portfolios')


urlpatterns = [
    path('', include(router.urls)),
]
