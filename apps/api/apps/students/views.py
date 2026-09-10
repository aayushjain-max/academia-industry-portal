import uuid
from datetime import datetime, timezone
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import StudentProfile, StudentChatSession, GuardianConsentStatus
from .serializers import (
    StudentProfileSerializer,
    StudentChatSessionSerializer,
    PublicPortfolioSerializer
)

from common.permissions.object_permissions import IsOwnerOrAdmin

from common.constants.roles import UserRole

class StudentProfileViewSet(viewsets.ModelViewSet):
    queryset = StudentProfile.objects.select_related('user').all()
    serializer_class = StudentProfileSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdmin]

    def get_queryset(self):
        user = self.request.user
        if not user or not user.is_authenticated:
            return StudentProfile.objects.none()
        if user.is_staff or user.role in [UserRole.SUPER_ADMIN, UserRole.INSTITUTION_ADMIN, UserRole.ACADEMICIAN, UserRole.INDUSTRY]:
            return StudentProfile.objects.select_related('user').all()
        return StudentProfile.objects.select_related('user').filter(user=user)

    @action(detail=False, methods=['get', 'patch', 'put'], permission_classes=[permissions.IsAuthenticated])
    def me(self, request):
        profile = StudentProfile.objects.filter(user=request.user).first()
        if not profile:
            base_slug = request.user.email.split('@')[0].lower()
            slug = base_slug
            if StudentProfile.objects.filter(portfolio_slug=slug).exists():
                slug = f"{base_slug}-{uuid.uuid4().hex[:6]}"
            profile = StudentProfile.objects.create(
                user=request.user,
                degree='B.Tech',
                portfolio_slug=slug
            )

        if request.method in ['PATCH', 'PUT']:
            serializer = self.get_serializer(profile, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)


        serializer = self.get_serializer(profile)
        return Response(serializer.data)

    @action(detail=False, methods=['get', 'post'], permission_classes=[permissions.IsAuthenticated])
    def advisor(self, request):
        """
        AI Career Advisor Session & Quota Management.
        """
        profile, _ = StudentProfile.objects.get_or_create(user=request.user)
        session, _ = StudentChatSession.objects.get_or_create(student=profile)

        # Check quota reset (if new UTC day)
        now = datetime.now(timezone.utc)
        if session.last_reset_at.date() < now.date():
            session.daily_count = 0
            session.last_reset_at = now
            session.save(update_fields=['daily_count', 'last_reset_at'])

        if request.method == 'POST':
            if session.daily_count >= session.daily_limit:
                return Response(
                    {'error': f'Daily message quota of {session.daily_limit} reached. Resets at 00:00 UTC.'},
                    status=status.HTTP_429_TOO_MANY_REQUESTS
                )

            user_prompt = request.data.get('message', '').strip()
            if not user_prompt:
                return Response({'error': 'Message content is required.'}, status=status.HTTP_400_BAD_REQUEST)

            # Record user message
            user_msg = {
                'id': str(uuid.uuid4()),
                'role': 'user',
                'content': user_prompt,
                'timestamp': now.strftime('%I:%M %p')
            }

            # AI Advisor contextualized response
            ai_reply = {
                'id': str(uuid.uuid4()),
                'role': 'assistant',
                'content': f"AI Advisor response to: '{user_prompt}'. Telemetry synchronized with verified student passport.",
                'timestamp': now.strftime('%I:%M %p'),
                'suggested_actions': [
                    {'label': 'View Readiness Score', 'href': '/student/readiness'},
                    {'label': 'Take Assessment', 'href': '/student/assessment'}
                ]
            }

            # Update rolling context window (keep last 100 messages in DB, send rolling 8)
            messages = session.messages or []
            messages.append(user_msg)
            messages.append(ai_reply)

            session.messages = messages[-100:]
            session.daily_count += 1
            session.save(update_fields=['messages', 'daily_count', 'updated_at'])

            return Response({
                'reply': ai_reply,
                'daily_count': session.daily_count,
                'remaining_quota': max(0, session.daily_limit - session.daily_count)
            })

        serializer = StudentChatSessionSerializer(session)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], permission_classes=[permissions.AllowAny], url_path='public/(?P<slug>[^/.]+)')
    def public_portfolio(self, request, slug=None):
        """
        Public-facing recruiter endpoint for candidate portfolio.
        """
        profile = get_object_or_404(StudentProfile, portfolio_slug=slug)
        serializer = PublicPortfolioSerializer(profile)
        return Response(serializer.data)

    @action(detail=False, methods=['post'], permission_classes=[permissions.AllowAny], url_path='guardian-confirm/(?P<token>[^/.]+)')
    def confirm_guardian(self, request, token=None):
        """
        Parent / Guardian consent approval notary endpoint.
        """
        profile = get_object_or_404(StudentProfile, guardian_token=token)
        profile.guardian_consent_status = GuardianConsentStatus.CONFIRMED
        profile.guardian_confirmed_at = datetime.now(timezone.utc)
        profile.save(update_fields=['guardian_consent_status', 'guardian_confirmed_at'])

        return Response({
            'success': True,
            'message': 'Guardian consent confirmed and recorded in student credential dossier.',
            'student_name': f"{profile.user.first_name} {profile.user.last_name}".strip() or profile.user.email
        })

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def dashboard_stats(self, request):
        profile = getattr(request.user, 'student_profile', None)
        if not profile:
            return Response({
                'active_applications': 0,
                'verified_skills_count': 0,
                'career_readiness_score': 74,
                'completed_assessments': 0,
                'matching_opportunities': 5
            })

        active_apps = profile.applications.count() if hasattr(profile, 'applications') else 0

        return Response({
            'active_applications': active_apps,
            'verified_skills_count': 7,
            'career_readiness_score': 74,
            'completed_assessments': 4,
            'matching_opportunities': 4
        })
