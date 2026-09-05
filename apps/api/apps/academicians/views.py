from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import AcademicianProfile
from .serializers import AcademicianProfileSerializer

class AcademicianProfileViewSet(viewsets.ModelViewSet):
    queryset = AcademicianProfile.objects.select_related('user').all()
    serializer_class = AcademicianProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return super().get_permissions()

    @action(detail=False, methods=['get', 'patch', 'put'], permission_classes=[permissions.IsAuthenticated])
    def me(self, request):
        profile = getattr(request.user, 'academician_profile', None)
        if not profile:
            profile, _ = AcademicianProfile.objects.get_or_create(
                user=request.user,
                defaults={
                    'institution_name': 'Affiliated University',
                    'department': 'Computer Science & Engineering',
                }
            )

        if request.method in ['PATCH', 'PUT']:
            serializer = self.get_serializer(profile, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)

        serializer = self.get_serializer(profile)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def dashboard_stats(self, request):
        return Response({
            'mentorship_requests': 4,
            'active_mentees': 7,
            'research_proposals': 2,
            'industry_consultancies': 1,
            'fdp_programs_registered': 3
        })

