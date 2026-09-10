import hashlib
from rest_framework import serializers
from .models import SkillPassport

class SkillPassportSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.user.get_full_name', read_only=True)
    student_email = serializers.EmailField(source='student.user.email', read_only=True)
    institution = serializers.CharField(source='student.institution_name', read_only=True)
    degree = serializers.CharField(source='student.degree', read_only=True)
    student_id = serializers.CharField(source='student.id', read_only=True)
    full_name = serializers.SerializerMethodField()
    accreditation_tier = serializers.CharField(source='student.accreditation_tier', default='TIER-1', read_only=True)
    overall_readiness = serializers.FloatField(source='student.readiness_score', default=85.0, read_only=True)
    total_verified_credentials = serializers.SerializerMethodField()
    credentials = serializers.SerializerMethodField()

    class Meta:
        model = SkillPassport
        fields = [
            'id', 'student', 'student_id', 'student_name', 'full_name', 'student_email',
            'institution', 'degree', 'accreditation_tier', 'overall_readiness',
            'total_verified_credentials', 'credentials',
            'passport_number', 'qr_code_payload',
            'verified_credentials_snapshot', 'cryptographic_signature',
            'is_valid', 'issued_at', 'updated_at'
        ]
        read_only_fields = [
            'id', 'student', 'passport_number', 'qr_code_payload',
            'cryptographic_signature', 'is_valid', 'issued_at', 'updated_at'
        ]

    def get_full_name(self, obj):
        if obj.student and obj.student.user:
            return obj.student.user.get_full_name() or obj.student.user.email
        return 'Student'

    def get_total_verified_credentials(self, obj):
        snapshot = obj.verified_credentials_snapshot or []
        return len(snapshot)

    def get_credentials(self, obj):
        snapshot = obj.verified_credentials_snapshot or []
        result = []
        for idx, item in enumerate(snapshot):
            skill_name = item.get('skill', item.get('skill_name', f'Skill {idx+1}'))
            score = item.get('verified_score', item.get('score', 85))
            proficiency = item.get('proficiency', 'ADVANCED')
            verified_by = item.get('verified_by', 'National AI Engine // Council')
            verified_at = item.get('verified_at', obj.issued_at.isoformat() if obj.issued_at else '')
            raw_hash = f"{obj.passport_number}:{skill_name}:{score}"
            crypto_hash = item.get('crypto_hash', hashlib.sha256(raw_hash.encode()).hexdigest()[:16].upper())
            result.append({
                'id': str(idx + 1),
                'skill_name': skill_name,
                'proficiency': proficiency,
                'score': score,
                'verified_by': verified_by,
                'verified_at': verified_at,
                'verification_code': f"SEC-{str(obj.id)[:4].upper()}-{idx+1:02d}",
                'crypto_hash': f"0x{crypto_hash}"
            })
        return result

