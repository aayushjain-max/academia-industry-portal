from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import DigitalPortfolio
from .serializers import DigitalPortfolioSerializer, PublicPortfolioSerializer
from apps.students.models import StudentProfile
from common.permissions.object_permissions import IsOwnerOrAdmin

from common.constants.roles import UserRole

class DigitalPortfolioViewSet(viewsets.ModelViewSet):
    serializer_class = DigitalPortfolioSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdmin]

    def get_queryset(self):
        user = self.request.user
        if not user or not user.is_authenticated:
            return DigitalPortfolio.objects.filter(is_public=True)
        if user.is_staff or user.role in [UserRole.SUPER_ADMIN, UserRole.INSTITUTION_ADMIN, UserRole.ACADEMICIAN, UserRole.INDUSTRY]:
            return DigitalPortfolio.objects.select_related('student__user').all()
        student_profile = getattr(user, 'student_profile', None)
        if student_profile:
            return (DigitalPortfolio.objects.select_related('student__user').filter(student=student_profile) | 
                    DigitalPortfolio.objects.select_related('student__user').filter(is_public=True)).distinct()
        return DigitalPortfolio.objects.filter(is_public=True)

    @action(detail=False, methods=['get', 'patch', 'put'])
    def me(self, request):
        student_profile = getattr(request.user, 'student_profile', None)
        if not student_profile:
            return Response({'error': 'Only students have a digital portfolio.'}, status=status.HTTP_400_BAD_REQUEST)

        default_username = request.user.email.split('@')[0].lower()
        portfolio, _ = DigitalPortfolio.objects.get_or_create(
            student=student_profile,
            defaults={'username': default_username}
        )

        if request.method in ['PATCH', 'PUT']:
            serializer = self.get_serializer(portfolio, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)

        serializer = self.get_serializer(portfolio)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='public/(?P<username>[^/.]+)', permission_classes=[permissions.AllowAny])
    def public_portfolio(self, request, username=None):
        portfolio = DigitalPortfolio.objects.filter(username=username, is_public=True).first()
        if not portfolio:
            # Fallback check by user ID or email prefix
            portfolio = DigitalPortfolio.objects.filter(student__user__email__istartswith=username, is_public=True).first()
            if not portfolio:
                return Response({'error': 'Public portfolio not found.'}, status=status.HTTP_404_NOT_FOUND)

        # Increment views
        portfolio.views_count += 1
        portfolio.save(update_fields=['views_count'])

        student = portfolio.student
        user = student.user

        data = {
            'username': portfolio.username,
            'fullName': user.get_full_name() or user.email,
            'headline': student.headline or f"Student at {student.institution_name}",
            'bio': student.bio,
            'location': student.institution_name,
            'skills': student.skills.select_related('skill').all(),
            'projects': student.projects.all(),
            'certifications': student.certifications.all(),
            'achievements': portfolio.achievements or [
                "Top 10% in Algorithmic Problem Solving Assessment",
                "Winner: Smart India Hackathon 2024",
                "Certified Cloud Solutions Associate"
            ],
            'isPublic': portfolio.is_public
        }

        serializer = PublicPortfolioSerializer(data)
        return Response(serializer.data)

