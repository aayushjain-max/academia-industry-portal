from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    AcademicianProfileViewSet,
    PublicationViewSet,
    PatentViewSet,
    ResearchProjectViewSet,
    GrantOpportunityViewSet,
    GrantApplicationViewSet,
    IndustryCollaborationViewSet,
    ConsultancyProjectViewSet,
    FDPProgramViewSet,
    FDPRegistrationViewSet,
    TrainingProgramViewSet,
    TrainingRegistrationViewSet,
    WorkshopViewSet,
    WorkshopRegistrationViewSet,
)

router = DefaultRouter()
router.register(r'publications', PublicationViewSet, basename='academician-publications')
router.register(r'patents', PatentViewSet, basename='academician-patents')
router.register(r'research-projects', ResearchProjectViewSet, basename='academician-research-projects')
router.register(r'grant-opportunities', GrantOpportunityViewSet, basename='academician-grant-opportunities')
router.register(r'grant-applications', GrantApplicationViewSet, basename='academician-grant-applications')
router.register(r'collaborations', IndustryCollaborationViewSet, basename='academician-collaborations')
router.register(r'consultancies', ConsultancyProjectViewSet, basename='academician-consultancies')
router.register(r'fdp-programs', FDPProgramViewSet, basename='academician-fdp-programs')
router.register(r'fdp-registrations', FDPRegistrationViewSet, basename='academician-fdp-registrations')
router.register(r'training-programs', TrainingProgramViewSet, basename='academician-training-programs')
router.register(r'training-registrations', TrainingRegistrationViewSet, basename='academician-training-registrations')
router.register(r'workshops', WorkshopViewSet, basename='academician-workshops')
router.register(r'workshop-registrations', WorkshopRegistrationViewSet, basename='academician-workshop-registrations')
router.register(r'', AcademicianProfileViewSet, basename='academicians')

urlpatterns = [
    path('', include(router.urls)),
]
