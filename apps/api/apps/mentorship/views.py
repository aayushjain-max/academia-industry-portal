from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import MentorshipProfile, MentorshipSession
from .serializers import MentorshipProfileSerializer, MentorshipSessionSerializer
from apps.users.models import User

class MentorshipProfileViewSet(viewsets.ModelViewSet):
    queryset = MentorshipProfile.objects.filter(is_available=True)
    serializer_class = MentorshipProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return super().get_permissions()

class MentorshipSessionViewSet(viewsets.ModelViewSet):
    serializer_class = MentorshipSessionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return MentorshipSession.objects.filter(mentor=user) | MentorshipSession.objects.filter(mentee=user)

    @action(detail=False, methods=['post'], url_path='request')
    def request_session(self, request):
        mentor_id = request.data.get('mentorId')
        topic = request.data.get('topic', 'General Career Advisory')
        scheduled_at = request.data.get('scheduledAt')

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
        session.status = 'SCHEDULED'
        session.meeting_link = request.data.get('meetingLink', session.meeting_link)
        session.save()
        return Response(self.get_serializer(session).data)

