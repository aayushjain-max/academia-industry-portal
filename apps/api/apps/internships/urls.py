from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import InternshipsViewSet

router = DefaultRouter()
router.register(r'', InternshipsViewSet, basename='internships')

urlpatterns = [
    path('', include(router.urls)),
]
