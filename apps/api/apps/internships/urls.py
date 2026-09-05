from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import InternshipPostingViewSet

router = DefaultRouter()
router.register(r'', InternshipPostingViewSet, basename='internships')


urlpatterns = [
    path('', include(router.urls)),
]
