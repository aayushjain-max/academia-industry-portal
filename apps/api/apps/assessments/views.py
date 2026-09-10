from django.utils import timezone
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Assessment, AssessmentQuestion, AssessmentAttempt
from .serializers import (
    AssessmentSerializer,
    AssessmentQuestionPublicSerializer,
    AssessmentAttemptSerializer
)
from apps.skills.models import StudentSkill

class AssessmentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Assessment.objects.filter(status__in=['published', 'PUBLISHED']).prefetch_related('questions')
    serializer_class = AssessmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=True, methods=['get'])
    def questions(self, request, pk=None):
        assessment = self.get_object()
        questions = assessment.questions.all().order_by('order')
        serializer = AssessmentQuestionPublicSerializer(questions, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def submit(self, request, pk=None):
        assessment = self.get_object()
        student_profile = getattr(request.user, 'student_profile', None)
        if not student_profile:
            return Response({'error': 'Only students can submit assessments.'}, status=status.HTTP_400_BAD_REQUEST)

        answers = request.data.get('answers', {})
        questions = assessment.questions.all()
        total_points = sum(q.points for q in questions) or 100
        earned_points = 0
        correct_count = 0

        for q in questions:
            user_ans = answers.get(str(q.id)) or answers.get(q.id)
            correct_val = ""
            if isinstance(q.options, list) and 0 <= q.correct_option < len(q.options):
                correct_val = str(q.options[q.correct_option]).strip().lower()
            else:
                correct_val = str(q.correct_option).strip().lower()

            if user_ans is not None:
                user_str = str(user_ans).strip().lower()
                if user_str == correct_val or user_str == str(q.correct_option):
                    earned_points += q.points
                    correct_count += 1

        percentage = round((earned_points / total_points) * 100, 2) if total_points > 0 else 0.0
        passed = percentage >= assessment.passing_score

        skill_breakdown = {}
        skill_tags = assessment.skill_tags or []
        for tag in skill_tags:
            skill_breakdown[tag] = percentage
            if passed:
                from apps.skills.models import Skill
                skill_obj = Skill.objects.filter(name__iexact=tag).first()
                if skill_obj:
                    st_skill, _ = StudentSkill.objects.get_or_create(
                        student=student_profile,
                        skill=skill_obj,
                        defaults={'proficiency': 'INTERMEDIATE'}
                    )
                    st_skill.is_verified = True
                    st_skill.verified_score = percentage
                    st_skill.save()

        attempt = AssessmentAttempt.objects.create(
            assessment=assessment,
            student=student_profile,
            status='COMPLETED',
            score_raw=earned_points,
            score_percentage=percentage,
            total_questions=len(questions),
            correct_count=correct_count,
            topic_breakdown=skill_breakdown,
            submitted_answers=answers,
            completed_at=timezone.now()
        )

        return Response({
            'attemptId': str(attempt.id),
            'assessmentId': str(assessment.id),
            'userId': str(request.user.id),
            'score': earned_points,
            'percentage': percentage,
            'passed': passed,
            'skillBreakdown': skill_breakdown,
            'completedAt': attempt.completed_at.isoformat()
        }, status=status.HTTP_200_OK)

class AssessmentAttemptViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = AssessmentAttemptSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if not user or not user.is_authenticated:
            return AssessmentAttempt.objects.none()
        if user.is_staff or user.is_superuser or getattr(user, 'role', '') in ['SUPER_ADMIN', 'ACADEMICIAN', 'INSTITUTION_ADMIN', 'INDUSTRY']:
            return AssessmentAttempt.objects.all().select_related('assessment', 'student__user')
        student_profile = getattr(user, 'student_profile', None)
        if not student_profile:
            return AssessmentAttempt.objects.none()
        return AssessmentAttempt.objects.filter(student=student_profile).select_related('assessment')


