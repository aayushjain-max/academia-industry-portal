from django.contrib import admin
from .models import (
    AcademicianProfile,
    Publication,
    Patent,
    ResearchProject,
    ResearchMember,
    ResearchMilestone,
    GrantOpportunity,
    GrantApplication,
    IndustryCollaboration,
    ConsultancyProject,
    FDPProgram,
    FDPRegistration,
    TrainingProgram,
    TrainingRegistration,
    Workshop,
    WorkshopRegistration,
)

admin.site.register(AcademicianProfile)
admin.site.register(Publication)
admin.site.register(Patent)
admin.site.register(ResearchProject)
admin.site.register(ResearchMember)
admin.site.register(ResearchMilestone)
admin.site.register(GrantOpportunity)
admin.site.register(GrantApplication)
admin.site.register(IndustryCollaboration)
admin.site.register(ConsultancyProject)
admin.site.register(FDPProgram)
admin.site.register(FDPRegistration)
admin.site.register(TrainingProgram)
admin.site.register(TrainingRegistration)
admin.site.register(Workshop)
admin.site.register(WorkshopRegistration)
