from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from apps.users.models import User
from apps.students.models import StudentProfile
from apps.industries.models import IndustryProfile
from apps.academicians.models import AcademicianProfile
from apps.institutions.models import InstitutionProfile
from common.constants.roles import UserRole

class StudentProfileSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentProfile
        fields = ['id', 'institution_name', 'roll_number', 'degree', 'department', 'year_of_study', 'cgpa', 'headline', 'resume_url']

class IndustryProfileSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = IndustryProfile
        fields = ['id', 'company_name', 'website', 'industry_sector', 'company_size', 'headquarters', 'is_verified']

class AcademicianProfileSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicianProfile
        fields = ['id', 'institution_name', 'department', 'designation', 'qualifications', 'experience_years', 'is_verified']

class InstitutionProfileSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = InstitutionProfile
        fields = ['id', 'name', 'code', 'institution_type', 'accreditation', 'city', 'state', 'is_verified']

class UserDetailSerializer(serializers.ModelSerializer):
    student_profile = StudentProfileSummarySerializer(read_only=True)
    industry_profile = IndustryProfileSummarySerializer(read_only=True)
    academician_profile = AcademicianProfileSummarySerializer(read_only=True)
    institution_profile = InstitutionProfileSummarySerializer(read_only=True)

    class Meta:
        model = User
        fields = [
            'id', 'email', 'first_name', 'last_name', 'role', 'phone',
            'is_email_verified', 'avatar', 'preferred_language', 'onboarding_completed',
            'student_profile', 'industry_profile', 'academician_profile', 'institution_profile',
            'created_at'
        ]
        # Prevent privilege escalation: role, email verification, and id cannot be mutated via profile update
        read_only_fields = ['id', 'email', 'role', 'is_email_verified', 'created_at']

class RegisterSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=6)
    first_name = serializers.CharField(max_length=150, required=False, default='')
    last_name = serializers.CharField(max_length=150, required=False, default='')
    phone = serializers.CharField(max_length=20, required=False, default='')
    role = serializers.ChoiceField(
        choices=[
            (UserRole.STUDENT, 'Student'),
            (UserRole.INDUSTRY, 'Industry Representative'),
            (UserRole.ACADEMICIAN, 'Academician / Faculty'),
            (UserRole.INSTITUTION_ADMIN, 'Institution Administrator'),
        ],
        default=UserRole.STUDENT
    )
    preferred_language = serializers.CharField(max_length=10, required=False, default='en')
    
    # Optional profile fields during registration
    institution_name = serializers.CharField(max_length=255, required=False, default='')
    degree = serializers.CharField(max_length=150, required=False, default='')
    department = serializers.CharField(max_length=150, required=False, default='')
    designation = serializers.CharField(max_length=100, required=False, default='')
    company_name = serializers.CharField(max_length=255, required=False, default='')

    def validate_email(self, value):
        if User.objects.filter(email=value.lower()).exists():
            raise serializers.ValidationError("A user with this email address already exists.")
        return value.lower()

    def validate_role(self, value):
        # Disallow privilege escalation / self-registration as SUPER_ADMIN
        if value == UserRole.SUPER_ADMIN:
            raise serializers.ValidationError("Direct registration as Super Administrator is forbidden.")
        return value

    def create(self, validated_data):
        institution_name = validated_data.pop('institution_name', '')
        degree = validated_data.pop('degree', '')
        department = validated_data.pop('department', '')
        designation = validated_data.pop('designation', '')
        company_name = validated_data.pop('company_name', '')
        password = validated_data.pop('password')

        user = User.objects.create_user(
            password=password,
            **validated_data
        )

        # Automatically provision role-specific profile
        if user.role == UserRole.STUDENT:
            StudentProfile.objects.create(
                user=user,
                institution_name=institution_name,
                degree=degree,
                department=department
            )
        elif user.role == UserRole.INDUSTRY:
            IndustryProfile.objects.create(
                user=user,
                company_name=company_name or f"{user.first_name}'s Organization"
            )
        elif user.role == UserRole.ACADEMICIAN:
            AcademicianProfile.objects.create(
                user=user,
                institution_name=institution_name,
                department=department or 'Engineering',
                designation=designation or 'Assistant Professor'
            )
        elif user.role == UserRole.INSTITUTION_ADMIN:
            InstitutionProfile.objects.create(
                user=user,
                name=institution_name or f"{user.first_name}'s Institution"
            )

        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs.get('email').lower()
        password = attrs.get('password')

        user = authenticate(username=email, password=password)
        if not user:
            raise serializers.ValidationError("Invalid email or password.")
        if not user.is_active:
            raise serializers.ValidationError("User account is disabled.")

        refresh = RefreshToken.for_user(user)
        return {
            'user': user,
            'access': str(refresh.access_token),
            'refresh': str(refresh),
        }
