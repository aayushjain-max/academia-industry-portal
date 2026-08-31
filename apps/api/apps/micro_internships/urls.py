from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MicroInternshipsViewSet

router = DefaultRouter()
router.register(r'', MicroInternshipsViewSet, basename='micro_internships')

urlpatterns = [
    path('', include(router.urls)),
]
