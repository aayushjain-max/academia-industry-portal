from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import IndustryProfile
from .serializers import IndustryProfileSerializer

class IndustryProfileViewSet(viewsets.ModelViewSet):
    queryset = IndustryProfile.objects.select_related('user').all()
    serializer_class = IndustryProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return super().get_permissions()

    @action(detail=False, methods=['get', 'patch', 'put'], permission_classes=[permissions.IsAuthenticated])
    def me(self, request):
        profile = getattr(request.user, 'industry_profile', None)
        if not profile:
            profile, _ = IndustryProfile.objects.get_or_create(
                user=request.user,
                defaults={'company_name': f"{request.user.first_name}'s Enterprise"}
            )

        if request.method in ['PATCH', 'PUT']:
            serializer = self.get_serializer(profile, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)

        serializer = self.get_serializer(profile)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def dashboard_stats(self, request):
        profile = getattr(request.user, 'industry_profile', None)
        if not profile:
            return Response({
                'active_opportunities': 0,
                'total_applicants': 0,
                'shortlisted_candidates': 0,
                'interviews_scheduled': 0
            })

        opps_count = profile.opportunities.count()
        apps_count = sum(o.applications.count() for o in profile.opportunities.all())
        shortlisted_count = sum(o.applications.filter(status='SHORTLISTED').count() for o in profile.opportunities.all())

        return Response({
            'active_opportunities': opps_count,
            'total_applicants': apps_count,
            'shortlisted_candidates': shortlisted_count,
            'interviews_scheduled': max(1, shortlisted_count)
        })


