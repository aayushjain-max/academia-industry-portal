from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import StudentProfile
from .serializers import StudentProfileSerializer

class StudentProfileViewSet(viewsets.ModelViewSet):
    queryset = StudentProfile.objects.select_related('user').all()
    serializer_class = StudentProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset

    @action(detail=False, methods=['get', 'patch', 'put'], permission_classes=[permissions.IsAuthenticated])
    def me(self, request):
        profile = getattr(request.user, 'student_profile', None)
        if not profile:
            profile, _ = StudentProfile.objects.get_or_create(
                user=request.user,
                defaults={'degree': 'B.Tech'}
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
        profile = getattr(request.user, 'student_profile', None)
        if not profile:
            return Response({
                'active_applications': 0,
                'verified_skills_count': 0,
                'career_readiness_score': 75,
                'completed_assessments': 0,
                'matching_opportunities': 5
            })

        active_apps = profile.applications.count()
        skills_count = profile.skills.count()

        return Response({
            'active_applications': active_apps,
            'verified_skills_count': skills_count,
            'career_readiness_score': 82,
            'completed_assessments': 3,
            'matching_opportunities': 8
        })


