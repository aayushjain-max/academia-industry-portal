from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegisterSerializer, LoginSerializer, UserDetailSerializer

class RegisterAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        refresh = RefreshToken.for_user(user)
        user_data = UserDetailSerializer(user).data

        return Response({
            'message': 'User registered successfully.',
            'user': user_data,
            'access': str(refresh.access_token),
            'refresh': str(refresh),
        }, status=status.HTTP_201_CREATED)

class LoginAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        user_data = UserDetailSerializer(data['user']).data

        return Response({
            'message': 'Login successful.',
            'user': user_data,
            'access': data['access'],
            'refresh': data['refresh'],
        }, status=status.HTTP_200_OK)

class CurrentUserAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = UserDetailSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request):
        user = request.user
        serializer = UserDetailSerializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

class OnboardingAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = request.user
        data = request.data

        # Update core user fields
        if 'first_name' in data:
            user.first_name = data['first_name']
        if 'last_name' in data:
            user.last_name = data['last_name']
        if 'phone' in data:
            user.phone = data['phone']
        if 'preferred_language' in data:
            user.preferred_language = data['preferred_language']
        user.onboarding_completed = True
        user.save()

        # Update role-specific profile fields
        if user.is_student and hasattr(user, 'student_profile'):
            sp = user.student_profile
            sp.institution_name = data.get('institution_name', sp.institution_name)
            sp.degree = data.get('degree', sp.degree)
            sp.department = data.get('department', sp.department)
            sp.year_of_study = data.get('year_of_study', sp.year_of_study)
            sp.bio = data.get('bio', sp.bio)
            sp.save()
        elif user.is_industry and hasattr(user, 'industry_profile'):
            ip = user.industry_profile
            ip.company_name = data.get('company_name', ip.company_name)
            ip.industry_sector = data.get('industry_sector', ip.industry_sector)
            ip.website = data.get('website', ip.website)
            ip.save()
        elif user.is_academician and hasattr(user, 'academician_profile'):
            ap = user.academician_profile
            ap.institution_name = data.get('institution_name', ap.institution_name)
            ap.department = data.get('department', ap.department)
            ap.designation = data.get('designation', ap.designation)
            ap.save()
        elif user.is_institution_admin and hasattr(user, 'institution_profile'):
            inst = user.institution_profile
            inst.name = data.get('institution_name', inst.name)
            inst.city = data.get('city', inst.city)
            inst.state = data.get('state', inst.state)
            inst.save()

        return Response({
            'message': 'Onboarding completed successfully.',
            'user': UserDetailSerializer(user).data
        }, status=status.HTTP_200_OK)

class LanguagesAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        languages = [
            {'code': 'en', 'name': 'English', 'native_name': 'English'},
            {'code': 'hi', 'name': 'Hindi', 'native_name': 'हिन्दी'},
            {'code': 'ta', 'name': 'Tamil', 'native_name': 'தமிழ்'},
            {'code': 'te', 'name': 'Telugu', 'native_name': 'తెలుగు'},
            {'code': 'mr', 'name': 'Marathi', 'native_name': 'मराठी'},
            {'code': 'bn', 'name': 'Bengali', 'native_name': 'বাংলা'},
            {'code': 'kn', 'name': 'Kannada', 'native_name': 'ಕನ್ನಡ'},
            {'code': 'gu', 'name': 'Gujarati', 'native_name': 'ગુજરાતી'},
        ]
        return Response({'languages': languages}, status=status.HTTP_200_OK)


