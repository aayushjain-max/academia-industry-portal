from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import RegisterAPIView, LoginAPIView, CurrentUserAPIView, OnboardingAPIView, LanguagesAPIView

urlpatterns = [
    path('register/', RegisterAPIView.as_view(), name='auth-register'),
    path('login/', LoginAPIView.as_view(), name='auth-login'),
    path('refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    path('me/', CurrentUserAPIView.as_view(), name='auth-current-user'),
    path('onboarding/', OnboardingAPIView.as_view(), name='auth-onboarding'),
    path('languages/', LanguagesAPIView.as_view(), name='auth-languages'),
]


