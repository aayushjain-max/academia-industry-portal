from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import MentorshipProfile, MentorshipSession
from .serializers import MentorshipProfileSerializer, MentorshipSessionSerializer
from apps.users.models import User
from common.permissions.object_permissions import IsOwnerOrAdmin

class MentorshipProfileViewSet(viewsets.ModelViewSet):
    serializer_class = MentorshipProfileSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdmin]

    def get_queryset(self):
        if self.action in ['list', 'retrieve']:
            return MentorshipProfile.objects.filter(is_available=True)
        if self.request.user.is_staff or getattr(self.request.user, 'role', '') == 'SUPER_ADMIN':
            return MentorshipProfile.objects.all()
        return MentorshipProfile.objects.filter(user=self.request.user)

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated(), IsOwnerOrAdmin()]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class MentorshipSessionViewSet(viewsets.ModelViewSet):
    serializer_class = MentorshipSessionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return MentorshipSession.objects.filter(mentor=user) | MentorshipSession.objects.filter(mentee=user)

    def perform_create(self, serializer):
        # Support default POST /mentorship/sessions/ if caller provides mentor_id in body
        mentor_id = self.request.data.get('mentorId') or self.request.data.get('mentor_id')
        if mentor_id:
            try:
                mentor_user = User.objects.get(id=mentor_id)
            except (User.DoesNotExist, ValueError):
                mentor_profile = MentorshipProfile.objects.filter(id=mentor_id).first()
                if mentor_profile:
                    mentor_user = mentor_profile.user
                else:
                    raise permissions.exceptions.ValidationError({'mentor_id': 'Invalid mentor ID provided.'})
            serializer.save(mentee=self.request.user, mentor=mentor_user)
        else:
            serializer.save(mentee=self.request.user)

    @action(detail=False, methods=['post'], url_path='request')
    def request_session(self, request):
        mentor_id = request.data.get('mentorId') or request.data.get('mentor_id')
        topic = request.data.get('topic', 'General Career Advisory')
        scheduled_at = request.data.get('scheduledAt') or request.data.get('scheduled_at')

        if not mentor_id or not scheduled_at:
            return Response({'error': 'mentorId and scheduledAt are required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            mentor_user = User.objects.get(id=mentor_id)
        except (User.DoesNotExist, ValueError):
            # If mentor profile ID was passed
            mentor_profile = MentorshipProfile.objects.filter(id=mentor_id).first()
            if mentor_profile:
                mentor_user = mentor_profile.user
            else:
                return Response({'error': 'Mentor not found.'}, status=status.HTTP_404_NOT_FOUND)

        session = MentorshipSession.objects.create(
            mentor=mentor_user,
            mentee=request.user,
            topic=topic,
            scheduled_at=scheduled_at,
            status='REQUESTED'
        )

        serializer = self.get_serializer(session)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'])
    def confirm(self, request, pk=None):
        session = self.get_object()
        user = request.user
        if not (user == session.mentor or user.is_staff or getattr(user, 'role', '') == 'SUPER_ADMIN'):
            return Response(
                {'error': 'Only the designated mentor or an administrator can confirm this session.'},
                status=status.HTTP_403_FORBIDDEN
            )
        session.status = 'SCHEDULED'
        session.meeting_link = request.data.get('meetingLink', session.meeting_link)
        session.save()
        return Response(self.get_serializer(session).data)

