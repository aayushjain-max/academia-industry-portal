from rest_framework import serializers
from .models import MentorshipProfile, MentorshipSession

class MentorshipProfileSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='user.get_full_name', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = MentorshipProfile
        fields = [
            'id', 'user', 'name', 'email', 'expertise', 'company_or_institution',
            'designation', 'bio', 'is_available', 'total_sessions_completed',
            'rating', 'created_at'
        ]
        read_only_fields = ['id', 'user', 'created_at']

class MentorshipSessionSerializer(serializers.ModelSerializer):
    mentorId = serializers.CharField(source='mentor.id', read_only=True)
    menteeId = serializers.CharField(source='mentee.id', read_only=True)
    scheduledAt = serializers.DateTimeField(source='scheduled_at')
    durationMinutes = serializers.IntegerField(source='duration_minutes', default=45)
    meetingLink = serializers.URLField(source='meeting_link', required=False)
    feedbackNotes = serializers.CharField(source='feedback_notes', required=False, allow_blank=True)
    mentor_name = serializers.CharField(source='mentor.get_full_name', read_only=True)
    mentee_name = serializers.CharField(source='mentee.get_full_name', read_only=True)

    class Meta:
        model = MentorshipSession
        fields = [
            'id', 'mentorId', 'menteeId', 'mentor_name', 'mentee_name',
            'topic', 'scheduledAt', 'durationMinutes', 'meetingLink',
            'status', 'feedbackNotes', 'rating', 'created_at'
        ]
        read_only_fields = ['id', 'mentorId', 'menteeId', 'created_at']

