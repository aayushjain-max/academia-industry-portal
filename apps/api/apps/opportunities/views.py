from rest_framework import viewsets, permissions, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Opportunity, OpportunityStatus
from .serializers import OpportunitySerializer
from apps.industries.models import IndustryProfile
from apps.skills.models import StudentSkill

class OpportunityViewSet(viewsets.ModelViewSet):
    queryset = Opportunity.objects.select_related('industry').prefetch_related('required_skills').all()
    serializer_class = OpportunitySerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, DjangoFilterBackend, filters.OrderingFilter]
    search_fields = ['title', 'description', 'industry__company_name', 'location']
    filterset_fields = ['opportunity_type', 'is_remote', 'status']
    ordering_fields = ['created_at', 'application_deadline']

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return super().get_permissions()

    def perform_create(self, serializer):
        # Automatically assign industry profile of the current user
        industry_profile, _ = IndustryProfile.objects.get_or_create(
            user=self.request.user,
            defaults={'company_name': f"{self.request.user.first_name}'s Organization"}
        )
        serializer.save(industry=industry_profile)

    @action(detail=True, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def match(self, request, pk=None):
        opp = self.get_object()
        student_profile = getattr(request.user, 'student_profile', None)
        if not student_profile:
            return Response({'error': 'Only students can check opportunity match.'}, status=status.HTTP_400_BAD_REQUEST)

        required_skills = list(opp.required_skills.all())
        student_skills = StudentSkill.objects.filter(student=student_profile).select_related('skill')
        student_skill_names = {s.skill.name.lower() for s in student_skills}

        matching_skills = []
        missing_skills = []

        for req in required_skills:
            if req.name.lower() in student_skill_names:
                matching_skills.append(req.name)
            else:
                missing_skills.append(req.name)

        if not required_skills:
            match_pct = 90.0
        else:
            match_pct = round((len(matching_skills) / len(required_skills)) * 100, 1)

        eligibility = match_pct >= 50.0
        reason = (
            f"You possess {len(matching_skills)} of the {len(required_skills)} required skills. "
            f"{'Strong candidate profile!' if match_pct >= 75 else 'Eligible to apply, recommend acquiring missing skills.'}"
        )

        return Response({
            'opportunityId': str(opp.id),
            'matchPercentage': match_pct,
            'matchingSkills': matching_skills,
            'missingSkills': missing_skills,
            'eligibility': eligibility,
            'reason': reason
        })


