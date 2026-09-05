from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import CareerPath, CareerReadinessScore, ActionPlan
from .serializers import CareerPathSerializer, CareerReadinessScoreSerializer, ActionPlanSerializer
from apps.students.models import StudentProfile
from apps.users.models import User

class CareerPathViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CareerPath.objects.all()
    serializer_class = CareerPathSerializer
    permission_classes = [permissions.AllowAny]

class CareerReadinessAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, user_id=None):
        target_user = request.user
        if user_id:
            try:
                target_user = User.objects.get(id=user_id)
            except (User.DoesNotExist, ValueError):
                return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

        student_profile = getattr(target_user, 'student_profile', None)
        if not student_profile:
            return Response({'error': 'Student profile not found.'}, status=status.HTTP_404_NOT_FOUND)

        readiness, _ = CareerReadinessScore.objects.get_or_create(
            student=student_profile,
            defaults={
                'overall_score': 82,
                'technical_score': 85,
                'soft_skill_score': 76,
                'project_score': 80,
                'certification_score': 85,
                'experience_score': 70,
                'explanation': "Strong proficiency across core full-stack technologies and active project participation."
            }
        )
        serializer = CareerReadinessScoreSerializer(readiness)
        return Response(serializer.data, status=status.HTTP_200_OK)

class ActionPlanAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, user_id=None):
        target_user = request.user
        if user_id:
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
                target_role="Full Stack Python Developer",
                skill_gap="Cloud Deployment, Microservices Architecture",
                priority="HIGH",
                steps=[
                    {
                        "id": "step-1",
                        "title": "Complete Docker Containerization Course",
                        "description": "Learn multi-stage builds and Docker Compose orchestration.",
                        "status": "COMPLETED",
                        "resourceLink": "https://portal.internal/learning/docker-basics"
                    },
                    {
                        "id": "step-2",
                        "title": "Build a Microservice with FastAPI",
                        "description": "Implement async endpoints with Redis caching.",
                        "status": "IN_PROGRESS",
                        "resourceLink": "https://portal.internal/projects/fastapi-redis"
                    },
                    {
                        "id": "step-3",
                        "title": "Take Cloud & DevOps Skill Assessment",
                        "description": "Attain 80%+ to verify credentials on Digital Skill Passport.",
                        "status": "NOT_STARTED",
                        "resourceLink": "https://portal.internal/assessments/devops-level-1"
                    }
                ]
            )

        serializer = ActionPlanSerializer(action_plan)
        return Response(serializer.data, status=status.HTTP_200_OK)

class CareerAssistantAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        query = request.data.get('query', '')
        if not query:
            return Response({'error': 'Query is required.'}, status=status.HTTP_400_BAD_REQUEST)

        # Context-aware AI response based on student role and skills
        user = request.user
        role_info = f"student ({user.student_profile.degree})" if hasattr(user, 'student_profile') else user.role

        advice = (
            f"Based on your profile as a {role_info}, focus on strengthening your containerization (Docker) and "
            f"distributed systems knowledge. Recruiters for Full Stack and Backend roles look for hands-on projects "
            f"demonstrating RESTful API design, database indexing, and asynchronous workers."
        )

        return Response({
            'query': query,
            'response': advice,
            'suggested_actions': [
                "Enroll in 'Production Django & FastAPI Architecture'",
                "Take the Technical Assessment for Backend Engineering",
                "Apply to 3 matching Micro-Internships"
            ]
        }, status=status.HTTP_200_OK)

