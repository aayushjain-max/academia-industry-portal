from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MicroInternshipViewSet

router = DefaultRouter()
router.register(r'', MicroInternshipViewSet, basename='micro-internships')


urlpatterns = [
    path('', include(router.urls)),
]
