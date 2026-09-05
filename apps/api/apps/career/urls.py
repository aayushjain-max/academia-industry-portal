from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CareerPathViewSet,
    CareerReadinessAPIView,
    ActionPlanAPIView,
    CareerAssistantAPIView
)

router = DefaultRouter()
router.register(r'paths', CareerPathViewSet, basename='career-paths')

urlpatterns = [
    path('readiness/', CareerReadinessAPIView.as_view(), name='career-readiness-me'),
    path('readiness/<str:user_id>/', CareerReadinessAPIView.as_view(), name='career-readiness-user'),
    path('action-plan/', ActionPlanAPIView.as_view(), name='career-action-plan-me'),
    path('action-plan/<str:user_id>/', ActionPlanAPIView.as_view(), name='career-action-plan-user'),
    path('assistant/', CareerAssistantAPIView.as_view(), name='career-assistant'),
    path('', include(router.urls)),
]

