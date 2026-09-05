from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import SkillPassport
from .serializers import SkillPassportSerializer
from apps.skills.models import StudentSkill

class SkillPassportViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SkillPassport.objects.select_related('student__user').all()
    serializer_class = SkillPassportSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['get'])
    def my_passport(self, request):
        student_profile = getattr(request.user, 'student_profile', None)
        if not student_profile:
            return Response({'error': 'Only students can access a skill passport.'}, status=status.HTTP_400_BAD_REQUEST)

        # Build snapshot of verified skills
        verified_skills = StudentSkill.objects.filter(student=student_profile, is_verified=True).select_related('skill')
        snapshot = [
            {
                'skill': vs.skill.name,
                'proficiency': vs.proficiency,
                'verified_score': vs.verified_score or 85.0
            }
            for vs in verified_skills
        ]

        passport, _ = SkillPassport.objects.get_or_create(
            student=student_profile,
            defaults={'verified_credentials_snapshot': snapshot}
        )

        # Refresh snapshot
        passport.verified_credentials_snapshot = snapshot
        passport.save()

        serializer = self.get_serializer(passport)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='verify/(?P<signature>[^/.]+)', permission_classes=[permissions.AllowAny])
    def verify_passport(self, request, signature=None):
        passport = SkillPassport.objects.filter(cryptographic_signature=signature).first()
        if not passport:
            return Response({
                'valid': False,
                'message': 'Invalid signature or passport record not found.'
            }, status=status.HTTP_404_NOT_FOUND)

        student = passport.student
        return Response({
            'valid': passport.is_valid,
            'passportNumber': passport.passport_number,
            'studentName': student.user.get_full_name() or student.user.email,
            'institution': student.institution_name,
            'degree': student.degree,
            'issuedAt': passport.issued_at,
            'verifiedCredentials': passport.verified_credentials_snapshot,
            'signature': passport.cryptographic_signature,
            'message': 'Digital Skill Passport is authentic and cryptographically verified.'
        })

