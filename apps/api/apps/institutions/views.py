from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import InstitutionProfile
from .serializers import InstitutionProfileSerializer

class InstitutionProfileViewSet(viewsets.ModelViewSet):
    queryset = InstitutionProfile.objects.all()
    serializer_class = InstitutionProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.action in ['list', 'retrieve', 'analytics']:
            return [permissions.AllowAny()]
        return super().get_permissions()

    @action(detail=False, methods=['get', 'patch', 'put'], permission_classes=[permissions.IsAuthenticated])
    def me(self, request):
        profile = getattr(request.user, 'institution_profile', None)
        if not profile:
            profile, _ = InstitutionProfile.objects.get_or_create(
                user=request.user,
                defaults={'name': f"{request.user.first_name}'s Institution"}
            )

        if request.method in ['PATCH', 'PUT']:
            serializer = self.get_serializer(profile, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)

        serializer = self.get_serializer(profile)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def analytics(self, request):
        total_institutions = InstitutionProfile.objects.count()
        verified_count = InstitutionProfile.objects.filter(is_verified=True).count()
        return Response({
            'total_institutions': total_institutions,
            'verified_institutions': verified_count,
            'placement_benchmarks': {
                'average_placement_rate': 78.5,
                'top_performing_tier': 'NIRF Top 50'
            }
        })

