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
    queryset = Assessment.objects.filter(status='PUBLISHED').prefetch_related('skills_assessed')
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
        total_points = sum(q.points for q in questions) or assessment.total_marks or 100
        earned_points = 0

        for q in questions:
            user_ans = answers.get(str(q.id)) or answers.get(q.id)
            if user_ans and str(user_ans).strip().lower() == str(q.correct_answer).strip().lower():
                earned_points += q.points

        percentage = round((earned_points / total_points) * 100, 2) if total_points > 0 else 0.0
        passed = percentage >= assessment.passing_score

        skill_breakdown = {}
        for s in assessment.skills_assessed.all():
            skill_breakdown[s.name] = percentage
            if passed:
                # Automatically mark skill as verified for student
                st_skill, _ = StudentSkill.objects.get_or_create(
                    student=student_profile,
                    skill=s,
                    defaults={'proficiency': 'INTERMEDIATE'}
                )
                st_skill.is_verified = True
                st_skill.verified_score = percentage
                st_skill.save()

        attempt = AssessmentAttempt.objects.create(
            assessment=assessment,
            student=student_profile,
            status='COMPLETED',
            score=earned_points,
            percentage=percentage,
            passed=passed,
            skill_breakdown=skill_breakdown,
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
        student_profile = getattr(self.request.user, 'student_profile', None)
        if not student_profile:
            return AssessmentAttempt.objects.none()
        return AssessmentAttempt.objects.filter(student=student_profile).select_related('assessment')

