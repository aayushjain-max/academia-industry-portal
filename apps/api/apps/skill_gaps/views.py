from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import SkillGapAnalysis
from .serializers import SkillGapAnalysisSerializer
from apps.skills.models import StudentSkill

ROLE_SKILL_BENCHMARKS = {
    'Full Stack Developer': ['Python', 'Django', 'React', 'JavaScript', 'PostgreSQL', 'Docker'],
    'AI/ML Engineer': ['Python', 'Machine Learning', 'Natural Language Processing', 'Docker', 'PostgreSQL'],
    'Data Scientist': ['Python', 'Machine Learning', 'PostgreSQL', 'Problem Solving'],
    'DevOps Engineer': ['Docker', 'PostgreSQL', 'Redis', 'Python'],
    'Frontend Developer': ['React', 'JavaScript', 'TypeScript', 'UI/UX Design'],
    'Backend Engineer': ['Python', 'Django', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker'],
}

class SkillGapsViewSet(viewsets.ModelViewSet):
    serializer_class = SkillGapAnalysisSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        student_profile = getattr(self.request.user, 'student_profile', None)
        if not student_profile:
            return SkillGapAnalysis.objects.none()
        return SkillGapAnalysis.objects.filter(student=student_profile)

    @action(detail=False, methods=['post'])
    def analyze(self, request):
        student_profile = getattr(request.user, 'student_profile', None)
        if not student_profile:
            return Response({'error': 'Only students can request skill gap analysis.'}, status=status.HTTP_400_BAD_REQUEST)

        target_role = request.data.get('target_role', 'Full Stack Developer')
        benchmark_skills = ROLE_SKILL_BENCHMARKS.get(
            target_role,
            ['Python', 'Django', 'React', 'PostgreSQL', 'Docker']
        )

        student_skills = StudentSkill.objects.filter(student=student_profile).select_related('skill')
        student_skill_names = {s.skill.name.lower() for s in student_skills}

        matched = []
        missing = []
        for req in benchmark_skills:
            if req.lower() in student_skill_names:
                matched.append(req)
            else:
                missing.append(req)

        readiness = round((len(matched) / len(benchmark_skills)) * 100, 1) if benchmark_skills else 0.0

        recommendations = [
            f"Enroll in recommended course for {skill}" for skill in missing[:3]
        ]
        if missing:
            recommendations.append(f"Build a capstone project utilizing {missing[0]} and {matched[0] if matched else 'core APIs'}.")

        analysis = SkillGapAnalysis.objects.create(
            student=student_profile,
            target_role=target_role,
            required_skills=benchmark_skills,
            matched_skills=matched,
            missing_skills=missing,
            readiness_percentage=readiness,
            recommendations=recommendations
        )

        serializer = self.get_serializer(analysis)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

