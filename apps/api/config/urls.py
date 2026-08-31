from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # OpenAPI Schema & Docs
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
    
    # Core API Endpoints
    path('api/v1/auth/', include('apps.authentication.urls')),
    path('api/v1/users/', include('apps.users.urls')),
    path('api/v1/roles/', include('apps.roles.urls')),
    path('api/v1/students/', include('apps.students.urls')),
    path('api/v1/industries/', include('apps.industries.urls')),
    path('api/v1/academicians/', include('apps.academicians.urls')),
    path('api/v1/institutions/', include('apps.institutions.urls')),
    
    # Skills & Intelligence
    path('api/v1/skills/', include('apps.skills.urls')),
    path('api/v1/assessments/', include('apps.assessments.urls')),
    path('api/v1/skill-profiles/', include('apps.skill_profiles.urls')),
    path('api/v1/skill-gaps/', include('apps.skill_gaps.urls')),
    path('api/v1/career/', include('apps.career.urls')),
    
    # Opportunities & Applications
    path('api/v1/opportunities/', include('apps.opportunities.urls')),
    path('api/v1/internships/', include('apps.internships.urls')),
    path('api/v1/placements/', include('apps.placements.urls')),
    path('api/v1/projects/', include('apps.projects.urls')),
    path('api/v1/micro-internships/', include('apps.micro_internships.urls')),
    path('api/v1/applications/', include('apps.applications.urls')),
    
    # Learning & Development
    path('api/v1/learning/', include('apps.learning.urls')),
    path('api/v1/certifications/', include('apps.certifications.urls')),
    path('api/v1/mentorship/', include('apps.mentorship.urls')),
    
    # Passports, Portfolios & Gamification
    path('api/v1/portfolios/', include('apps.portfolios.urls')),
    path('api/v1/skill-passports/', include('apps.skill_passports.urls')),
    path('api/v1/gamification/', include('apps.gamification.urls')),
    
    # Platform Services
    path('api/v1/analytics/', include('apps.analytics.urls')),
    path('api/v1/notifications/', include('apps.notifications.urls')),
    path('api/v1/documents/', include('apps.documents.urls')),
    path('api/v1/search/', include('apps.search.urls')),
    path('api/v1/verification/', include('apps.verification.urls')),
    path('api/v1/audit/', include('apps.audit.urls')),
]
