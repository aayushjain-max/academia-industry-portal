import uuid
from rest_framework import viewsets, permissions, status, serializers
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import VerificationRecord
from .serializers import VerificationRecordSerializer
from .permissions import VerificationPermission
from .services.verify_certificate import generate_cryptographic_hash, verify_certificate_authenticity
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model

class VerificationViewSet(viewsets.ModelViewSet):
    queryset = VerificationRecord.objects.all()
    serializer_class = VerificationRecordSerializer
    permission_classes = [VerificationPermission]

    def get_queryset(self):
        user = self.request.user
        if not user or not user.is_authenticated:
            return VerificationRecord.objects.none()
        if user.is_staff or user.is_superuser or getattr(user, 'role', '') in ['SUPER_ADMIN', 'ACADEMICIAN', 'INSTITUTION_ADMIN']:
            return VerificationRecord.objects.all().select_related('user', 'verified_by')
        return VerificationRecord.objects.filter(user=user).select_related('user', 'verified_by')

    def get_permissions(self):
        if self.action in ['retrieve', 'validate_custom_hash']:
            return [permissions.AllowAny()]
        return [VerificationPermission()]

    def perform_create(self, serializer):
        if not (self.request.user and self.request.user.is_authenticated):
            raise permissions.exceptions.NotAuthenticated("Authentication credentials were not provided.")

        target_user = None
        user_id = self.request.data.get('user_id') or self.request.data.get('userId') or self.request.data.get('user')
        if user_id:
            User = get_user_model()
            try:
                target_user = User.objects.get(id=user_id)
            except Exception:
                raise serializers.ValidationError({"user": "Target user does not exist."})
        elif self.request.user and self.request.user.is_authenticated:
            target_user = self.request.user
        else:
            raise serializers.ValidationError({"user": "A valid target user is required."})

        code = serializer.validated_data.get('verification_code') or f"VER-{uuid.uuid4().hex[:12].upper()}"
        metadata = serializer.validated_data.get('metadata', {})
        
        # Calculate cryptographic proof hash
        payload_to_sign = {
            "code": code,
            "record_type": serializer.validated_data.get('record_type'),
            "metadata": metadata
        }
        signature = generate_cryptographic_hash(payload_to_sign)
        metadata['crypto_hash'] = signature
        metadata['algorithm'] = 'HMAC-SHA256'

        serializer.save(
            user=target_user,
            verification_code=code,
            verified_by=self.request.user if self.request.user.is_authenticated else None,
            metadata=metadata,
            status='VERIFIED'
        )


    def retrieve(self, request, pk=None):
        try:
            record = VerificationRecord.objects.get(id=pk)
        except Exception:
            record = get_object_or_404(VerificationRecord, verification_code=pk)

        metadata = record.metadata or {}
        crypto_hash = metadata.get('crypto_hash', '')
        
        payload_to_verify = {
            "code": record.verification_code,
            "record_type": record.record_type,
            "metadata": {k: v for k, v in metadata.items() if k not in ['crypto_hash', 'algorithm']}
        }
        
        # Check authenticity
        is_crypto_valid, reason = verify_certificate_authenticity(payload_to_verify, crypto_hash) if crypto_hash else (True, "Legacy record")

        serializer = self.get_serializer(record)
        return Response({
            "verified": record.status == 'VERIFIED' and is_crypto_valid,
            "cryptographic_proof_valid": is_crypto_valid,
            "verification_status": record.status,
            "signature": crypto_hash,
            "algorithm": metadata.get('algorithm', 'HMAC-SHA256'),
            "reason": reason,
            "record": serializer.data
        })

    @action(detail=False, methods=['post'], url_path='validate-hash')
    def validate_custom_hash(self, request):
        payload = request.data.get('payload', {})
        provided_hash = request.data.get('hash', '')
        if not provided_hash:
            return Response({"error": "No hash provided"}, status=status.HTTP_400_BAD_REQUEST)
        
        is_valid, msg = verify_certificate_authenticity(payload, provided_hash)
        return Response({
            "is_valid": is_valid,
            "message": msg
        })
