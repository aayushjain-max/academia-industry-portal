from rest_framework import viewsets, permissions, exceptions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Application, ApplicationStatus
from .serializers import ApplicationSerializer
from common.permissions.object_permissions import IsApplicationOwnerOrRecruiter, CanUpdateApplicationStatus
from common.constants.roles import UserRole

class ApplicationViewSet(viewsets.ModelViewSet):
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated, IsApplicationOwnerOrRecruiter]

    def get_queryset(self):
        user = self.request.user
        if not user or not user.is_authenticated:
            return Application.objects.none()

        if user.is_staff or user.is_superuser or user.role == UserRole.SUPER_ADMIN:
            return Application.objects.all().select_related('student', 'student__user', 'opportunity', 'opportunity__industry')

        if hasattr(user, 'student_profile'):
            return Application.objects.filter(student=user.student_profile).select_related('opportunity', 'opportunity__industry')
        elif hasattr(user, 'industry_profile'):
            return Application.objects.filter(opportunity__industry=user.industry_profile).select_related('student', 'student__user', 'opportunity')
        elif hasattr(user, 'academician_profile') or hasattr(user, 'institution_profile'):
            # Institution admins/academicians can view applications from students of their institution
            inst_name = getattr(getattr(user, 'academician_profile', None), 'institution_name', None) or \
                        getattr(getattr(user, 'institution_profile', None), 'name', None)
            if inst_name:
                return Application.objects.filter(student__institution_name=inst_name).select_related('student', 'student__user', 'opportunity')
        return Application.objects.none()

    def perform_create(self, serializer):
        user = self.request.user
        if not hasattr(user, 'student_profile'):
            raise exceptions.PermissionDenied("Only registered students can apply for opportunities.")

        student_profile = user.student_profile
        opportunity = serializer.validated_data.get('opportunity')
        
        if not opportunity:
            raise exceptions.ValidationError({"opportunity": "Opportunity must be specified."})

        if Application.objects.filter(student=student_profile, opportunity=opportunity).exists():
            raise exceptions.ValidationError({"detail": "You have already submitted an application to this opportunity."})

        serializer.save(student=student_profile, status=ApplicationStatus.APPLIED)

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def withdraw(self, request, pk=None):
        """Allows a student to withdraw their own pending application."""
        app = self.get_object()
        user = request.user

        if not hasattr(user, 'student_profile') or app.student != user.student_profile:
            raise exceptions.PermissionDenied("You can only withdraw your own applications.")

        if app.status in [ApplicationStatus.ACCEPTED, ApplicationStatus.REJECTED, ApplicationStatus.WITHDRAWN]:
            return Response(
                {"error": f"Cannot withdraw application in status '{app.status}'."},
                status=status.HTTP_400_BAD_REQUEST
            )

        app.status = ApplicationStatus.WITHDRAWN
        app.save(update_fields=['status', 'updated_at'])
        return Response(self.get_serializer(app).data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated, CanUpdateApplicationStatus])
    def update_status(self, request, pk=None):
        """Allows the recruiting partner or admin to update the application status."""
        app = self.get_object()
        user = request.user

        # Explicit check: only hiring industry partner or superadmin can change application status
        is_recruiter = hasattr(user, 'industry_profile') and app.opportunity.industry == user.industry_profile
        is_admin = user.is_staff or user.is_superuser or user.role == UserRole.SUPER_ADMIN

        if not (is_recruiter or is_admin):
            raise exceptions.PermissionDenied("Only the hiring industry partner or administrator can update the application status.")

        new_status = request.data.get('status')
        feedback = request.data.get('feedback')

        valid_statuses = [
            ApplicationStatus.APPLIED,
            ApplicationStatus.UNDER_REVIEW,
            ApplicationStatus.SHORTLISTED,
            ApplicationStatus.INTERVIEW,
            ApplicationStatus.ACCEPTED,
            ApplicationStatus.REJECTED
        ]

        if not new_status or new_status not in valid_statuses:
            return Response(
                {"error": f"Invalid status '{new_status}'. Allowed values: {valid_statuses}"},
                status=status.HTTP_400_BAD_REQUEST
            )

        app.status = new_status
        if feedback is not None:
            app.feedback = feedback

        app.save(update_fields=['status', 'feedback', 'updated_at'])
        return Response(self.get_serializer(app).data, status=status.HTTP_200_OK)
