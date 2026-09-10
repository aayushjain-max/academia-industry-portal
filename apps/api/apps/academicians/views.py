from rest_framework import viewsets, permissions, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from .models import (
    AcademicianProfile,
    Publication,
    Patent,
    ResearchProject,
    ResearchMilestone,
    ResearchMember,
    GrantOpportunity,
    GrantApplication,
    IndustryCollaboration,
    ConsultancyProject,
    FDPProgram,
    FDPRegistration,
    TrainingProgram,
    TrainingRegistration,
    Workshop,
    WorkshopRegistration,
)
from .serializers import (
    AcademicianProfileSerializer,
    PublicationSerializer,
    PatentSerializer,
    ResearchProjectSerializer,
    ResearchMilestoneSerializer,
    ResearchMemberSerializer,
    GrantOpportunitySerializer,
    GrantApplicationSerializer,
    IndustryCollaborationSerializer,
    ConsultancyProjectSerializer,
    FDPProgramSerializer,
    FDPRegistrationSerializer,
    TrainingProgramSerializer,
    TrainingRegistrationSerializer,
    WorkshopSerializer,
    WorkshopRegistrationSerializer,
)
from .permissions import (
    IsAcademician,
    IsAcademicianOrReadOnly,
    IsOwnerAcademician,
    IsHODOrInstitutionAdmin,
)
from .selectors import (
    get_academician_for_user,
    get_academician_dashboard_metrics,
    get_department_students_list,
    get_department_skill_heatmap_data,
    get_curriculum_industry_alignment_data,
    calculate_faculty_impact_score,
)
from .services import (
    update_academician_profile,
    register_for_fdp,
    register_for_training,
    register_for_workshop,
)


class AcademicianProfileViewSet(viewsets.ModelViewSet):
    queryset = AcademicianProfile.objects.select_related('user').all()
    serializer_class = AcademicianProfileSerializer
    permission_classes = [permissions.IsAuthenticated, IsAcademicianOrReadOnly]
    filter_backends = [filters.SearchFilter]
    search_fields = ['department', 'institution_name', 'designation', 'user__first_name', 'user__last_name', 'areas_of_expertise']

    @action(detail=False, methods=['get', 'patch', 'put'], permission_classes=[permissions.IsAuthenticated])
    def me(self, request):
        profile = get_academician_for_user(request.user)

        if request.method in ['PATCH', 'PUT']:
            serializer = self.get_serializer(profile, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            updated = update_academician_profile(profile, serializer.validated_data)
            return Response(self.get_serializer(updated).data)

        serializer = self.get_serializer(profile)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def dashboard(self, request):
        profile = get_academician_for_user(request.user)
        metrics = get_academician_dashboard_metrics(profile)
        return Response(metrics)

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def dashboard_stats(self, request):
        profile = get_academician_for_user(request.user)
        metrics = get_academician_dashboard_metrics(profile)
        return Response(metrics.get('scholastic_metrics', {}))

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated, IsAcademician])
    def students(self, request):
        profile = get_academician_for_user(request.user)
        batch = request.query_params.get('batch')
        readiness = request.query_params.get('readiness')
        search = request.query_params.get('search')

        students_data = get_department_students_list(
            academician=profile,
            batch=batch,
            readiness_category=readiness,
            search=search
        )
        return Response(students_data)

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated, IsAcademician])
    def skill_heatmap(self, request):
        profile = get_academician_for_user(request.user)
        batch = request.query_params.get('batch')
        data = get_department_skill_heatmap_data(profile, batch=batch)
        return Response(data)

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated, IsAcademician])
    def curriculum_alignment(self, request):
        profile = get_academician_for_user(request.user)
        data = get_curriculum_industry_alignment_data(profile)
        return Response(data)

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def faculty_impact(self, request):
        profile = get_academician_for_user(request.user)
        data = calculate_faculty_impact_score(profile)
        return Response(data)


class PublicationViewSet(viewsets.ModelViewSet):
    serializer_class = PublicationSerializer
    permission_classes = [permissions.IsAuthenticated, IsAcademicianOrReadOnly, IsOwnerAcademician]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'authors', 'journal', 'conference', 'doi']
    ordering_fields = ['publication_date', 'citation_count', 'created_at']

    def get_queryset(self):
        user = self.request.user
        if user.is_staff or user.is_superuser:
            return Publication.objects.select_related('academician__user').all()
        profile = getattr(user, 'academician_profile', None)
        if profile:
            return Publication.objects.filter(academician=profile)
        return Publication.objects.none()

    def perform_create(self, serializer):
        profile = get_academician_for_user(self.request.user)
        serializer.save(academician=profile)


class PatentViewSet(viewsets.ModelViewSet):
    serializer_class = PatentSerializer
    permission_classes = [permissions.IsAuthenticated, IsAcademicianOrReadOnly, IsOwnerAcademician]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'patent_number', 'inventors', 'jurisdiction']
    ordering_fields = ['filing_date', 'grant_date', 'created_at']

    def get_queryset(self):
        user = self.request.user
        if user.is_staff or user.is_superuser:
            return Patent.objects.select_related('academician__user').all()
        profile = getattr(user, 'academician_profile', None)
        if profile:
            return Patent.objects.filter(academician=profile)
        return Patent.objects.none()

    def perform_create(self, serializer):
        profile = get_academician_for_user(self.request.user)
        serializer.save(academician=profile)


class ResearchProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ResearchProjectSerializer
    permission_classes = [permissions.IsAuthenticated, IsAcademicianOrReadOnly, IsOwnerAcademician]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description', 'research_area', 'funding_agency', 'industry_partner']
    ordering_fields = ['start_date', 'funding_amount', 'created_at']

    def get_queryset(self):
        user = self.request.user
        if user.is_staff or user.is_superuser:
            return ResearchProject.objects.prefetch_related('milestones', 'members').all()
        profile = getattr(user, 'academician_profile', None)
        if profile:
            return ResearchProject.objects.filter(academician=profile).prefetch_related('milestones', 'members')
        return ResearchProject.objects.none()

    def perform_create(self, serializer):
        profile = get_academician_for_user(self.request.user)
        project = serializer.save(academician=profile)
        
        milestones = self.request.data.get('milestones', [])
        for ms in milestones:
            if isinstance(ms, dict) and ms.get('title'):
                ResearchMilestone.objects.create(
                    project=project,
                    title=ms.get('title'),
                    description=ms.get('description', ''),
                    due_date=ms.get('due_date', None),
                    status=ms.get('status', 'PENDING'),
                    progress_percentage=ms.get('progress_percentage', 0),
                )

        members = self.request.data.get('members', [])
        for m in members:
            if isinstance(m, dict) and m.get('name'):
                ResearchMember.objects.create(
                    project=project,
                    name=m.get('name'),
                    role=m.get('role', 'CO_PI'),
                    email=m.get('email', ''),
                    affiliation=m.get('affiliation', ''),
                    joined_at=m.get('joined_at', timezone.now().date()),
                )

        # Add PI if not already in members
        if not project.members.filter(role='PI').exists():
            ResearchMember.objects.create(
                project=project,
                name=f"{profile.user.first_name} {profile.user.last_name}".strip() or profile.user.email,
                role='PI',
                email=profile.user.email,
                affiliation=profile.institution_name,
                joined_at=timezone.now().date()
            )

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated, IsOwnerAcademician])
    def add_milestone(self, request, pk=None):
        project = self.get_object()
        serializer = ResearchMilestoneSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        milestone = ResearchMilestone.objects.create(project=project, **serializer.validated_data)
        return Response(ResearchMilestoneSerializer(milestone).data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated, IsOwnerAcademician])
    def add_member(self, request, pk=None):
        project = self.get_object()
        serializer = ResearchMemberSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        member = ResearchMember.objects.create(project=project, **serializer.validated_data)
        return Response(ResearchMemberSerializer(member).data, status=status.HTTP_201_CREATED)


class GrantOpportunityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = GrantOpportunity.objects.filter(is_active=True)
    serializer_class = GrantOpportunitySerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'funding_agency', 'category', 'description']
    ordering_fields = ['deadline', 'total_funding', 'created_at']


class GrantApplicationViewSet(viewsets.ModelViewSet):
    serializer_class = GrantApplicationSerializer
    permission_classes = [permissions.IsAuthenticated, IsAcademicianOrReadOnly, IsOwnerAcademician]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['project_title', 'executive_summary']
    ordering_fields = ['submitted_at', 'requested_amount', 'created_at']

    def get_queryset(self):
        user = self.request.user
        if user.is_staff or user.is_superuser:
            return GrantApplication.objects.select_related('academician__user', 'grant_opportunity').all()
        profile = getattr(user, 'academician_profile', None)
        if profile:
            return GrantApplication.objects.filter(academician=profile).select_related('grant_opportunity')
        return GrantApplication.objects.none()

    def perform_create(self, serializer):
        profile = get_academician_for_user(self.request.user)
        grant_opp_id = self.request.data.get('grant_opportunity_id')
        grant_opp = None
        if grant_opp_id:
            try:
                grant_opp = GrantOpportunity.objects.get(id=grant_opp_id)
            except GrantOpportunity.DoesNotExist:
                pass
        serializer.save(
            academician=profile,
            grant_opportunity=grant_opp,
            status='SUBMITTED',
            submitted_at=timezone.now()
        )


class IndustryCollaborationViewSet(viewsets.ModelViewSet):
    serializer_class = IndustryCollaborationSerializer
    permission_classes = [permissions.IsAuthenticated, IsAcademicianOrReadOnly, IsOwnerAcademician]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['company_name', 'title', 'description', 'outcomes']
    ordering_fields = ['start_date', 'contract_value', 'created_at']

    def get_queryset(self):
        user = self.request.user
        if user.is_staff or user.is_superuser:
            return IndustryCollaboration.objects.select_related('academician__user').all()
        profile = getattr(user, 'academician_profile', None)
        if profile:
            return IndustryCollaboration.objects.filter(academician=profile)
        return IndustryCollaboration.objects.none()

    def perform_create(self, serializer):
        profile = get_academician_for_user(self.request.user)
        serializer.save(academician=profile)


class ConsultancyProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ConsultancyProjectSerializer
    permission_classes = [permissions.IsAuthenticated, IsAcademicianOrReadOnly, IsOwnerAcademician]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['client_company', 'project_title', 'description', 'deliverables']
    ordering_fields = ['start_date', 'contract_value', 'hours_delivered', 'created_at']

    def get_queryset(self):
        user = self.request.user
        if user.is_staff or user.is_superuser:
            return ConsultancyProject.objects.select_related('academician__user').all()
        profile = getattr(user, 'academician_profile', None)
        if profile:
            return ConsultancyProject.objects.filter(academician=profile)
        return ConsultancyProject.objects.none()

    def perform_create(self, serializer):
        profile = get_academician_for_user(self.request.user)
        serializer.save(academician=profile)


class FDPProgramViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FDPProgram.objects.filter(is_active=True)
    serializer_class = FDPProgramSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'organizer', 'category', 'description']
    ordering_fields = ['start_date', 'created_at']

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def register(self, request, pk=None):
        profile = get_academician_for_user(request.user)
        reg = register_for_fdp(profile, str(pk))
        return Response(FDPRegistrationSerializer(reg, context={'request': request}).data, status=status.HTTP_201_CREATED)


class FDPRegistrationViewSet(viewsets.ModelViewSet):
    serializer_class = FDPRegistrationSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerAcademician]

    def get_queryset(self):
        profile = getattr(self.request.user, 'academician_profile', None)
        if not profile:
            return FDPRegistration.objects.none()
        return FDPRegistration.objects.filter(academician=profile).select_related('program')


class TrainingProgramViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TrainingProgram.objects.filter(is_active=True)
    serializer_class = TrainingProgramSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'provider', 'industry_partner', 'description']
    ordering_fields = ['start_date', 'created_at']

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def register(self, request, pk=None):
        profile = get_academician_for_user(request.user)
        reg = register_for_training(profile, str(pk))
        return Response(TrainingRegistrationSerializer(reg, context={'request': request}).data, status=status.HTTP_201_CREATED)


class TrainingRegistrationViewSet(viewsets.ModelViewSet):
    serializer_class = TrainingRegistrationSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerAcademician]

    def get_queryset(self):
        profile = getattr(self.request.user, 'academician_profile', None)
        if not profile:
            return TrainingRegistration.objects.none()
        return TrainingRegistration.objects.filter(academician=profile).select_related('program')


class WorkshopViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Workshop.objects.filter(is_active=True)
    serializer_class = WorkshopSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'domain', 'organizer', 'description']
    ordering_fields = ['start_date', 'created_at']

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def register(self, request, pk=None):
        profile = get_academician_for_user(request.user)
        reg = register_for_workshop(profile, str(pk))
        return Response(WorkshopRegistrationSerializer(reg, context={'request': request}).data, status=status.HTTP_201_CREATED)


class WorkshopRegistrationViewSet(viewsets.ModelViewSet):
    serializer_class = WorkshopRegistrationSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerAcademician]

    def get_queryset(self):
        profile = getattr(self.request.user, 'academician_profile', None)
        if not profile:
            return WorkshopRegistration.objects.none()
        return WorkshopRegistration.objects.filter(academician=profile).select_related('workshop')
