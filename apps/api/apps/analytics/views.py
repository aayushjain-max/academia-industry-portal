from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import AnalyticsSnapshot
from .serializers import AnalyticsSnapshotSerializer
from .permissions import AnalyticsPermission
from apps.students.models import StudentProfile
from apps.opportunities.models import Opportunity
from apps.applications.models import Application, ApplicationStatus
from apps.skills.models import Skill
from apps.career.models import CareerReadinessScore
from common.constants.roles import UserRole
from django.db.models import Avg, Count, Q

class AnalyticsViewSet(viewsets.ModelViewSet):
    queryset = AnalyticsSnapshot.objects.all()
    serializer_class = AnalyticsSnapshotSerializer
    permission_classes = [permissions.IsAuthenticated, AnalyticsPermission]

    @action(detail=False, methods=['get'], url_path='institution-overview')
    def institution_overview(self, request):
        user = request.user
        student_qs = StudentProfile.objects.all()
        app_qs = Application.objects.all()

        # Scope data to institution if requested by institution admin or academician
        if user.role in [UserRole.INSTITUTION_ADMIN, UserRole.ACADEMICIAN] and not (user.is_staff or user.is_superuser):
            inst_name = getattr(getattr(user, 'academician_profile', None), 'institution_name', None) or \
                        getattr(getattr(user, 'institution_profile', None), 'name', None)
            if inst_name:
                student_qs = student_qs.filter(institution_name__iexact=inst_name)
                app_qs = app_qs.filter(student__institution_name__iexact=inst_name)

        total_students = student_qs.count()
        avg_readiness_val = CareerReadinessScore.objects.filter(student__in=student_qs).aggregate(avg=Avg('overall_score'))['avg']
        avg_readiness = round(float(avg_readiness_val), 1) if avg_readiness_val is not None else 0.0
        
        total_apps = app_qs.count()
        accepted_count = app_qs.filter(status__in=[ApplicationStatus.ACCEPTED, ApplicationStatus.SHORTLISTED]).count()
        placement_rate = round((accepted_count / max(total_apps, 1) * 100), 1) if total_apps > 0 else 0.0
        internship_rate = placement_rate

        # Dynamically query skills
        skill_counts = Skill.objects.annotate(student_count=Count('student_skills')).order_by('-student_count')[:6]
        top_skills = [
            {
                "skill": s.name,
                "demandIndex": min(100.0, float(s.student_count * 10))
            }
            for s in skill_counts
        ]

        # Dynamically calculate skill gaps based on active opportunities vs student skills
        top_opp_skills = Skill.objects.annotate(
            opp_count=Count('opportunities', filter=Q(opportunities__status='ACTIVE'))
        ).order_by('-opp_count')[:6]

        skill_gaps = []
        for s in top_opp_skills:
            st_skills = s.student_skills.all()
            avg_score = st_skills.aggregate(avg=Avg('verified_score'))['avg'] or 50.0
            req_score = 80.0
            skill_gaps.append({
                "skill": s.name,
                "studentAvg": round(float(avg_score), 1),
                "industryRequirement": req_score
            })

        data = {
            "totalStudents": total_students,
            "averageSkillReadiness": avg_readiness,
            "placementRate": placement_rate,
            "internshipRate": internship_rate,
            "topSkillsDemand": top_skills,
            "skillGapDistribution": skill_gaps
        }
        return Response(data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'], url_path='skill-demand-heatmap', permission_classes=[permissions.IsAuthenticated])
    def skill_demand_heatmap(self, request):
        """Aggregates demand based on active opportunity skill counts using ORM annotation."""
        skills = Skill.objects.annotate(
            opp_count=Count('opportunities', filter=Q(opportunities__status='ACTIVE'))
        ).order_by('-opp_count')[:15]

        heatmap = []
        total_opps = max(Opportunity.objects.filter(status='ACTIVE').count(), 1)
        for s in skills:
            opp_count = s.opp_count
            demand_pct = min(100, round((opp_count / total_opps) * 100))
            heatmap.append({
                "region": "National",
                "domain": getattr(s, 'category', 'Engineering') or 'Engineering',
                "skill": s.name,
                "demandScore": max(10, demand_pct),
                "growth": f"+{min(50, max(5, opp_count * 4))}%"
            })
        return Response(heatmap, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'], url_path='industry-trends', permission_classes=[permissions.IsAuthenticated])
    def industry_trends(self, request):
        open_positions = Opportunity.objects.filter(status='ACTIVE').count()
        applicants_total = Application.objects.count()
        shortlisted_total = Application.objects.filter(status__in=[ApplicationStatus.SHORTLISTED, ApplicationStatus.ACCEPTED]).count()

        top_skills = list(
            Skill.objects.annotate(opp_count=Count('opportunities'))
            .order_by('-opp_count')
            .values_list('name', flat=True)[:6]
        )

        data = {
            "openPositions": open_positions,
            "applicantsTotal": applicants_total,
            "shortlistedTotal": shortlisted_total,
            "topDemandedSkills": top_skills or ["Python", "Docker", "FastAPI", "React", "PostgreSQL"]
        }
        return Response(data, status=status.HTTP_200_OK)
