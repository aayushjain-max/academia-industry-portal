from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AcademiciansViewSet

router = DefaultRouter()
router.register(r'', AcademiciansViewSet, basename='academicians')

urlpatterns = [
    path('', include(router.urls)),
]
