from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import SkillProfile
from .serializers import SkillProfileSerializer
from apps.skills.models import StudentSkill
from apps.assessments.models import AssessmentAttempt

def compute_profile_data(student_profile):
    skills = StudentSkill.objects.filter(student=student_profile).select_related('skill')
    attempts = AssessmentAttempt.objects.filter(student=student_profile, status='COMPLETED')

    verified_skills = [s for s in skills if s.is_verified]
    strengths = []
    weaknesses = []
    domain_breakdown = {
        'Programming & Frameworks': 70.0,
        'Databases & Cloud': 65.0,
        'Problem Solving & Soft Skills': 75.0,
    }

    for s in skills:
        score = s.verified_score or (85.0 if s.proficiency == 'EXPERT' else 75.0 if s.proficiency == 'ADVANCED' else 60.0 if s.proficiency == 'INTERMEDIATE' else 45.0)
        if score >= 75.0:
            strengths.append(s.skill.name)
        else:
            weaknesses.append(s.skill.name)

    tech_score = 80.0 if strengths else 60.0
    if attempts.exists():
        avg_attempt = sum(a.percentage for a in attempts) / attempts.count()
        tech_score = round((tech_score + avg_attempt) / 2, 1)

    overall_score = round((tech_score * 0.5) + (75.0 * 0.3) + (len(verified_skills) * 4), 1)
    overall_score = min(98.0, max(40.0, overall_score))

    summary = f"Profile exhibits solid foundation across {len(skills)} skills with {len(verified_skills)} verified competencies. Strongest in {', '.join(strengths[:3]) if strengths else 'foundational concepts'}."

    return {
        'overall_score': overall_score,
        'technical_score': tech_score,
        'soft_skill_score': 76.0,
        'domain_score': 72.0,
        'strengths': strengths[:5],
        'weaknesses': weaknesses[:5],
        'domain_breakdown': domain_breakdown,
        'profile_summary': summary,
        'verified_skills_count': len(verified_skills),
    }

class SkillProfileViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SkillProfile.objects.select_related('student__user').all()
    serializer_class = SkillProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['get'])
    def my_profile(self, request):
        student_profile = getattr(request.user, 'student_profile', None)
        if not student_profile:
            return Response({'error': 'Only students have a skill profile.'}, status=status.HTTP_400_BAD_REQUEST)

        profile, created = SkillProfile.objects.get_or_create(
            student=student_profile,
            defaults=compute_profile_data(student_profile)
        )
        serializer = self.get_serializer(profile)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def refresh(self, request):
        student_profile = getattr(request.user, 'student_profile', None)
        if not student_profile:
            return Response({'error': 'Only students can refresh profile.'}, status=status.HTTP_400_BAD_REQUEST)

        data = compute_profile_data(student_profile)
        profile, _ = SkillProfile.objects.update_or_create(
            student=student_profile,
            defaults=data
        )
        serializer = self.get_serializer(profile)
        return Response(serializer.data)

