from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AcademicianProfileViewSet

router = DefaultRouter()
router.register(r'', AcademicianProfileViewSet, basename='academicians')


urlpatterns = [
    path('', include(router.urls)),
]
