from rest_framework import viewsets, permissions, exceptions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Application
from .serializers import ApplicationSerializer
from apps.students.models import StudentProfile
from apps.industries.models import IndustryProfile


class ApplicationViewSet(viewsets.ModelViewSet):
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if hasattr(user, 'student_profile'):
            return Application.objects.filter(student=user.student_profile).select_related('opportunity', 'opportunity__industry')
        elif hasattr(user, 'industry_profile'):
            return Application.objects.filter(opportunity__industry=user.industry_profile).select_related('student', 'student__user', 'opportunity')
        return Application.objects.none()

    def perform_create(self, serializer):
        user = self.request.user
        try:
            student_profile = user.student_profile
        except StudentProfile.DoesNotExist:
            student_profile = StudentProfile.objects.create(user=user)

        # Check if already applied
        opportunity = serializer.validated_data.get('opportunity')
        if Application.objects.filter(student=student_profile, opportunity=opportunity).exists():
            raise exceptions.ValidationError({"detail": "You have already applied to this opportunity."})

        serializer.save(student=student_profile)

    @action(detail=True, methods=['post'])
    def update_status(self, request, pk=None):
        app = self.get_object()
        new_status = request.data.get('status')
        feedback = request.data.get('feedback')
        if new_status:
            app.status = new_status
        if feedback:
            app.feedback = feedback
        app.save()
        return Response(self.get_serializer(app).data)


