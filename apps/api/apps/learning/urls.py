from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LearningResourceViewSet, UserLearningProgressViewSet, IndustryTrainingViewSet

router = DefaultRouter()
router.register(r'progress', UserLearningProgressViewSet, basename='learning-progress')
router.register(r'trainings', IndustryTrainingViewSet, basename='industry-trainings')
router.register(r'', LearningResourceViewSet, basename='learning-resources')


urlpatterns = [
    path('', include(router.urls)),
]
