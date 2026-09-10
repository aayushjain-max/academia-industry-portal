from rest_framework import serializers
from .models import (
    AcademicianProfile,
    Publication,
    Patent,
    ResearchProject,
    ResearchMember,
    ResearchMilestone,
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


def _get_acad_name(obj):
    if isinstance(obj, dict) or not hasattr(obj, 'academician') or not obj.academician:
        return ''
    user = getattr(obj.academician, 'user', None)
    if not user:
        return ''
    return f"{user.first_name} {user.last_name}".strip() or user.email


class AcademicianProfileSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email', read_only=True)
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)

    class Meta:
        model = AcademicianProfile
        fields = [
            'id', 'user', 'email', 'first_name', 'last_name',
            'institution_name', 'department', 'designation',
            'qualifications', 'experience_years', 'areas_of_expertise',
            'research_interests', 'industry_training_interests',
            'consultancy_areas', 'bio', 'orcid', 'google_scholar',
            'linkedin_url', 'website', 'avatar_url',
            'is_verified', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'user', 'is_verified', 'created_at', 'updated_at']


class PublicationSerializer(serializers.ModelSerializer):
    academician_name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Publication
        fields = [
            'id', 'academician', 'academician_name', 'title', 'authors',
            'journal', 'conference', 'publication_type', 'publication_date',
            'doi', 'url', 'abstract', 'indexing', 'citation_count',
            'is_verified', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'academician', 'created_at', 'updated_at']

    def get_academician_name(self, obj):
        return _get_acad_name(obj)


class PatentSerializer(serializers.ModelSerializer):
    academician_name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Patent
        fields = [
            'id', 'academician', 'academician_name', 'title', 'patent_number',
            'filing_date', 'grant_date', 'status', 'inventors', 'jurisdiction',
            'description', 'document_url', 'is_verified', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'academician', 'created_at', 'updated_at']

    def get_academician_name(self, obj):
        return _get_acad_name(obj)


class ResearchMilestoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResearchMilestone
        fields = [
            'id', 'project', 'title', 'description', 'due_date',
            'status', 'progress_percentage', 'completion_date'
        ]
        read_only_fields = ['id']


class ResearchMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResearchMember
        fields = [
            'id', 'project', 'name', 'role', 'email', 'affiliation', 'joined_at'
        ]
        read_only_fields = ['id']


class ResearchProjectSerializer(serializers.ModelSerializer):
    milestones = ResearchMilestoneSerializer(many=True, read_only=True)
    members = ResearchMemberSerializer(many=True, read_only=True)
    pi_name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = ResearchProject
        fields = [
            'id', 'academician', 'pi_name', 'title', 'description',
            'research_area', 'status', 'start_date', 'end_date',
            'funding_amount', 'funding_agency', 'industry_partner',
            'objectives', 'progress_percentage', 'milestones', 'members',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'academician', 'created_at', 'updated_at']

    def get_pi_name(self, obj):
        return _get_acad_name(obj)


class GrantOpportunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = GrantOpportunity
        fields = [
            'id', 'title', 'funding_agency', 'grant_code', 'category',
            'description', 'total_funding', 'duration_months', 'deadline',
            'eligibility_criteria', 'guidelines_url', 'is_active',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class GrantApplicationSerializer(serializers.ModelSerializer):
    grant_opportunity_details = GrantOpportunitySerializer(source='grant_opportunity', read_only=True)
    academician_name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = GrantApplication
        fields = [
            'id', 'academician', 'academician_name', 'grant_opportunity',
            'grant_opportunity_details', 'project_title', 'executive_summary',
            'requested_amount', 'status', 'submitted_at', 'approved_at',
            'review_notes', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'academician', 'submitted_at', 'approved_at', 'created_at', 'updated_at']

    def get_academician_name(self, obj):
        return _get_acad_name(obj)


class IndustryCollaborationSerializer(serializers.ModelSerializer):
    academician_name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = IndustryCollaboration
        fields = [
            'id', 'academician', 'academician_name', 'company_name', 'title',
            'collaboration_type', 'description', 'start_date', 'end_date',
            'status', 'contract_value', 'outcomes', 'document_url',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'academician', 'created_at', 'updated_at']

    def get_academician_name(self, obj):
        return _get_acad_name(obj)


class ConsultancyProjectSerializer(serializers.ModelSerializer):
    academician_name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = ConsultancyProject
        fields = [
            'id', 'academician', 'academician_name', 'client_company', 'project_title',
            'description', 'contract_value', 'institutional_share_pct', 'status',
            'start_date', 'end_date', 'deliverables', 'hours_allocated',
            'hours_delivered', 'invoice_status', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'academician', 'created_at', 'updated_at']

    def get_academician_name(self, obj):
        return _get_acad_name(obj)


class FDPProgramSerializer(serializers.ModelSerializer):
    is_registered = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = FDPProgram
        fields = [
            'id', 'title', 'organizer', 'mode', 'start_date', 'end_date',
            'duration_days', 'category', 'description', 'venue_or_link',
            'total_seats', 'is_active', 'is_registered', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def get_is_registered(self, obj):
        request = self.context.get('request')
        if not request or not request.user.is_authenticated:
            return False
        academician = getattr(request.user, 'academician_profile', None)
        if not academician:
            return False
        return obj.registrations.filter(academician=academician).exists()


class FDPRegistrationSerializer(serializers.ModelSerializer):
    program_details = FDPProgramSerializer(source='program', read_only=True)

    class Meta:
        model = FDPRegistration
        fields = [
            'id', 'academician', 'program', 'program_details', 'status',
            'certificate_url', 'feedback_score', 'feedback_text', 'registered_at'
        ]
        read_only_fields = ['id', 'academician', 'registered_at']


class TrainingProgramSerializer(serializers.ModelSerializer):
    is_registered = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = TrainingProgram
        fields = [
            'id', 'title', 'provider', 'industry_partner', 'start_date',
            'end_date', 'mode', 'description', 'eligibility', 'is_active',
            'is_registered', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def get_is_registered(self, obj):
        request = self.context.get('request')
        if not request or not request.user.is_authenticated:
            return False
        academician = getattr(request.user, 'academician_profile', None)
        if not academician:
            return False
        return obj.registrations.filter(academician=academician).exists()


class TrainingRegistrationSerializer(serializers.ModelSerializer):
    program_details = TrainingProgramSerializer(source='program', read_only=True)

    class Meta:
        model = TrainingRegistration
        fields = [
            'id', 'academician', 'program', 'program_details', 'status',
            'certificate_url', 'registered_at'
        ]
        read_only_fields = ['id', 'academician', 'registered_at']


class WorkshopSerializer(serializers.ModelSerializer):
    is_registered = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Workshop
        fields = [
            'id', 'title', 'domain', 'organizer', 'start_date', 'end_date',
            'description', 'venue_or_link', 'capacity', 'is_active',
            'is_registered', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def get_is_registered(self, obj):
        request = self.context.get('request')
        if not request or not request.user.is_authenticated:
            return False
        academician = getattr(request.user, 'academician_profile', None)
        if not academician:
            return False
        return obj.registrations.filter(academician=academician).exists()


class WorkshopRegistrationSerializer(serializers.ModelSerializer):
    workshop_details = WorkshopSerializer(source='workshop', read_only=True)

    class Meta:
        model = WorkshopRegistration
        fields = [
            'id', 'academician', 'workshop', 'workshop_details', 'status',
            'certificate_url', 'feedback_rating', 'registered_at'
        ]
        read_only_fields = ['id', 'academician', 'registered_at']


AcademicianSerializer = AcademicianProfileSerializer
