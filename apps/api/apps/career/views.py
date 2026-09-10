from rest_framework import viewsets, permissions, status, exceptions
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import CareerPath, CareerReadinessScore, ActionPlan
from .serializers import CareerPathSerializer, CareerReadinessScoreSerializer, ActionPlanSerializer
from apps.students.models import StudentProfile
from apps.users.models import User
from common.constants.roles import UserRole
from django.db.models import Avg

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
        attempts_rel = getattr(student_profile, 'assessment_attempts', None)
        ass_count = attempts_rel.count() if attempts_rel is not None else 0
        
        certs_count = getattr(student_profile, 'certifications', None)
        cert_num = certs_count.count() if certs_count is not None else 0

        projects_rel = getattr(student_profile, 'projects', None)
        proj_num = projects_rel.count() if projects_rel is not None else 0

        # Soft skills factor from verified skills or assessments
        soft_skills_qs = student_skills.filter(skill__category='SOFT_SKILLS') if student_skills is not None else []
        soft_score = int(soft_skills_qs.aggregate(avg=Avg('verified_score'))['avg'] or 70) if hasattr(soft_skills_qs, 'aggregate') else 70

        tech_score = min(100, max(40, 50 + (skill_count * 6)))
        ass_score = min(100, max(40, 50 + (ass_count * 10)))
        cert_score = min(100, max(40, 40 + (cert_num * 15)))
        proj_score = min(100, max(40, 40 + (proj_num * 15)))
        exp_score = min(100, max(40, 40 + (proj_num * 10)))

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
            dept = getattr(student_profile, 'department', 'Engineering') or 'Engineering'
            target_role = f"{dept} Specialist" if dept != 'Computer Science' else "Full Stack Software Engineer"
            action_plan = ActionPlan.objects.create(
                student=student_profile,
                target_role=target_role,
                skill_gap=f"Core Competency Acceleration for {target_role}",
                priority="HIGH",
                steps=[
                    {
                        "id": "step-1",
                        "title": f"Complete Diagnostic Assessment for {dept}",
                        "description": "Establish benchmark proficiency in core competencies.",
                        "status": "IN_PROGRESS",
                        "resourceLink": "/student/assessments"
                    },
                    {
                        "id": "step-2",
                        "title": "Build Applied Capstone Project",
                        "description": "Demonstrate practical application and commit verifiable repository.",
                        "status": "NOT_STARTED",
                        "resourceLink": "/student/projects"
                    },
                    {
                        "id": "step-3",
                        "title": "Mint Cryptographic Skill Passport Stamp",
                        "description": "Achieve benchmark score to verify credentials on-chain.",
                        "status": "NOT_STARTED",
                        "resourceLink": "/student/skill-passport"
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
