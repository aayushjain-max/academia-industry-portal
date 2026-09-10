from rest_framework import serializers
from .models import PlacementDrive, PlacementRecord

class PlacementDriveSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source='company.company_name', read_only=True)

    class Meta:
        model = PlacementDrive
        fields = [
            'id', 'company', 'company_name', 'title', 'eligible_branches',
            'minimum_cgpa', 'package_lpa', 'drive_date', 'rounds',
            'status', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'company', 'created_at', 'updated_at']

class PlacementRecordSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.user.get_full_name', read_only=True)
    drive_title = serializers.CharField(source='drive.title', read_only=True)
    company_name = serializers.CharField(source='drive.company.company_name', read_only=True)

    class Meta:
        model = PlacementRecord
        fields = [
            'id', 'student', 'student_name', 'drive', 'drive_title',
            'company_name', 'package_offered_lpa', 'status',
            'offer_letter_url', 'offered_at'
        ]
        read_only_fields = ['id', 'student', 'offered_at']

PlacementSerializer = PlacementDriveSerializer


