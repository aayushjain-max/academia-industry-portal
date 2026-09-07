from rest_framework import viewsets, permissions, status, exceptions
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import CareerPath, CareerReadinessScore, ActionPlan
from .serializers import CareerPathSerializer, CareerReadinessScoreSerializer, ActionPlanSerializer
from apps.students.models import StudentProfile
from apps.users.models import User
from common.constants.roles import UserRole

class CareerPathViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CareerPath.objects.all()
    serializer_class = CareerPathSerializer
    permission_classes = [permissions.IsAuthenticated]

class CareerReadinessAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, user_id=None):
        requesting_user = request.user
        target_user = requesting_user

        # IDOR protection: if user_id is provided, ensure requesting user is authorized to inspect
        if user_id and str(user_id) != str(requesting_user.id):
            is_authorized = (
                requesting_user.is_staff or
                requesting_user.is_superuser or
                requesting_user.role in [UserRole.SUPER_ADMIN, UserRole.INSTITUTION_ADMIN, UserRole.ACADEMICIAN]
            )
            if not is_authorized:
                raise exceptions.PermissionDenied("You are not authorized to view another candidate's readiness score.")
            try:
                target_user = User.objects.get(id=user_id)
            except (User.DoesNotExist, ValueError):
                return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

        student_profile = getattr(target_user, 'student_profile', None)
        if not student_profile:
            return Response({'error': 'Student profile not found.'}, status=status.HTTP_404_NOT_FOUND)

        # Calculate dynamic readiness metrics based on real candidate evidence
        student_skills = getattr(student_profile, 'skills', None)
        skill_count = student_skills.count() if student_skills is not None else 0
        
        # Evidence factors
        assessments_count = getattr(student_profile, 'assessments', None)
        ass_count = assessments_count.count() if assessments_count is not None else 0
        
        certs_count = getattr(student_profile, 'certifications', None)
        cert_num = certs_count.count() if certs_count is not None else 0

        projects_rel = getattr(student_profile, 'projects', None)
        proj_num = projects_rel.count() if projects_rel is not None else 0

        tech_score = min(98, max(30, 40 + (skill_count * 8)))
        ass_score = min(98, max(25, 35 + (ass_count * 12)))
        cert_score = min(98, max(20, 30 + (cert_num * 15)))
        proj_score = min(98, max(20, 35 + (proj_num * 15)))
        soft_score = 75
        exp_score = min(95, max(20, 30 + (proj_num * 10)))

        overall = int(
            (tech_score * 0.30) +
            (ass_score * 0.20) +
            (proj_score * 0.15) +
            (exp_score * 0.15) +
            (cert_score * 0.10) +
            (soft_score * 0.10)
        )

        readiness, _ = CareerReadinessScore.objects.update_or_create(
            student=student_profile,
            defaults={
                'overall_score': overall,
                'technical_score': tech_score,
                'soft_skill_score': soft_score,
                'project_score': proj_score,
                'certification_score': cert_score,
                'experience_score': exp_score,
                'explanation': f"Evaluated based on {skill_count} documented skills, {proj_num} live projects, {cert_num} certifications, and verified assessment benchmarks."
            }
        )
        serializer = CareerReadinessScoreSerializer(readiness)
        return Response(serializer.data, status=status.HTTP_200_OK)

class ActionPlanAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, user_id=None):
        requesting_user = request.user
        target_user = requesting_user

        if user_id and str(user_id) != str(requesting_user.id):
            is_authorized = (
                requesting_user.is_staff or
                requesting_user.is_superuser or
                requesting_user.role in [UserRole.SUPER_ADMIN, UserRole.INSTITUTION_ADMIN, UserRole.ACADEMICIAN]
            )
            if not is_authorized:
                raise exceptions.PermissionDenied("You are not authorized to view another candidate's action plan.")
            try:
                target_user = User.objects.get(id=user_id)
            except (User.DoesNotExist, ValueError):
                return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

        student_profile = getattr(target_user, 'student_profile', None)
        if not student_profile:
            return Response({'error': 'Student profile not found.'}, status=status.HTTP_404_NOT_FOUND)

        action_plan = ActionPlan.objects.filter(student=student_profile).first()
        if not action_plan:
            action_plan = ActionPlan.objects.create(
                student=student_profile,
                target_role="Full Stack Engineer",
                skill_gap="Cloud Infrastructure, Microservices Architecture",
                priority="HIGH",
                steps=[
                    {
                        "id": "step-1",
                        "title": "Complete Containerization & Docker Essentials",
                        "description": "Master multi-stage container builds and production deployment.",
                        "status": "IN_PROGRESS",
                        "resourceLink": "/student/learning"
                    },
                    {
                        "id": "step-2",
                        "title": "Build Distributed API Microservice",
                        "description": "Implement asynchronous queues and Redis caching layer.",
                        "status": "NOT_STARTED",
                        "resourceLink": "/student/projects"
                    },
                    {
                        "id": "step-3",
                        "title": "Take Backend Architecture Diagnostic Assessment",
                        "description": "Achieve 80%+ benchmark to earn verified skill passport stamp.",
                        "status": "NOT_STARTED",
                        "resourceLink": "/student/assessments"
                    }
                ]
            )

        serializer = ActionPlanSerializer(action_plan)
        return Response(serializer.data, status=status.HTTP_200_OK)

class CareerAssistantAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        query = request.data.get('query', '').strip()
        if not query:
            return Response({'error': 'Query is required.'}, status=status.HTTP_400_BAD_REQUEST)

        # Context-aware structured response
        user = request.user
        degree = getattr(getattr(user, 'student_profile', None), 'degree', 'Engineering')
        
        advice = (
            f"Based on your profile in {degree}, targeting industry placements requires demonstrable hands-on "
            f"project experience with cloud deployments, REST/GraphQL interfaces, and database optimization. "
            f"Regarding your query ('{query}'): prioritize completing your pending skill assessments and contributing "
            f"to live projects to elevate your verifiable skill passport tier."
        )

        return Response({
            'query': query,
            'response': advice,
            'suggested_actions': [
                "Run Diagnostic Skill Assessment",
                "Explore Matching Live Projects",
                "Export Cryptographic Skill Passport"
            ]
        }, status=status.HTTP_200_OK)
