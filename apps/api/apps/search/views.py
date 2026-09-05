from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import SearchHistory
from .serializers import SearchHistorySerializer
from apps.opportunities.models import Opportunity
from apps.skills.models import Skill
from apps.students.models import StudentProfile
from apps.projects.models import Project
from apps.institutions.models import InstitutionProfile
from apps.academicians.models import AcademicianProfile
from django.db.models import Q

class SearchViewSet(viewsets.ModelViewSet):
    queryset = SearchHistory.objects.all()
    serializer_class = SearchHistorySerializer
    permission_classes = [permissions.AllowAny]

    def list(self, request, *args, **kwargs):
        q = request.query_params.get('q', '').strip()
        cat = request.query_params.get('cat', '').strip().lower()

        if not q:
            return Response({
                "query": "",
                "total": 0,
                "results": {
                    "opportunities": [],
                    "skills": [],
                    "students": [],
                    "projects": [],
                    "institutions": [],
                    "academicians": []
                }
            })

        results = {
            "opportunities": [],
            "skills": [],
            "students": [],
            "projects": [],
            "institutions": [],
            "academicians": []
        }

        # 1. Opportunities
        if not cat or cat in ['opportunities', 'jobs', 'internships']:
            opps = Opportunity.objects.filter(
                Q(title__icontains=q) | Q(description__icontains=q) | Q(industry__company_name__icontains=q),
                status='ACTIVE'
            )[:10]
            for o in opps:
                results["opportunities"].append({
                    "id": str(o.id),
                    "title": o.title,
                    "company": o.industry.company_name if o.industry else "Confidential",
                    "type": o.opportunity_type,
                    "location": o.location,
                    "skills": [s.name for s in o.required_skills.all()]
                })

        # 2. Skills
        if not cat or cat in ['skills']:
            skills = Skill.objects.filter(
                Q(name__icontains=q) | Q(description__icontains=q)
            )[:10]
            for s in skills:
                results["skills"].append({
                    "id": str(s.id),
                    "name": s.name,
                    "category": s.category,
                    "demandLevel": "HIGH"
                })

        # 3. Students
        if not cat or cat in ['students', 'talents']:
            students = StudentProfile.objects.filter(
                Q(headline__icontains=q) | Q(institution_name__icontains=q) | Q(bio__icontains=q)
            )[:10]
            for st in students:
                results["students"].append({
                    "id": str(st.id),
                    "name": f"{st.user.first_name} {st.user.last_name}".strip() or st.user.username,
                    "headline": st.headline,
                    "college": st.institution_name,
                    "skills": [ss.skill.name for ss in st.skills.all()]
                })

        # 4. Projects
        if not cat or cat in ['projects']:
            projs = Project.objects.filter(
                Q(title__icontains=q) | Q(description__icontains=q)
            )[:10]
            for p in projs:
                results["projects"].append({
                    "id": str(p.id),
                    "title": p.title,
                    "type": p.project_type,
                    "technologies": p.technologies
                })

        # 5. Institutions
        if not cat or cat in ['institutions', 'colleges']:
            insts = InstitutionProfile.objects.filter(
                Q(name__icontains=q) | Q(city__icontains=q)
            )[:10]
            for i in insts:
                results["institutions"].append({
                    "id": str(i.id),
                    "name": i.name,
                    "type": i.institution_type,
                    "city": i.city,
                    "state": i.state
                })

        # 6. Academicians
        if not cat or cat in ['academicians', 'faculty', 'professors']:
            acad = AcademicianProfile.objects.filter(
                Q(department__icontains=q) | Q(designation__icontains=q) | Q(areas_of_expertise__icontains=q)
            )[:10]
            for a in acad:
                results["academicians"].append({
                    "id": str(a.id),
                    "name": f"{a.user.first_name} {a.user.last_name}".strip() or a.user.username,
                    "department": a.department,
                    "designation": a.designation,
                    "expertise": a.areas_of_expertise
                })

        total = sum(len(v) for v in results.values())
        
        # Save search query for user if authenticated
        if request.user.is_authenticated:
            SearchHistory.objects.create(
                user=request.user,
                query=q,
                category=cat or 'all',
                results_count=total
            )

        return Response({
            "query": q,
            "category": cat or 'all',
            "total": total,
            "results": results
        })
