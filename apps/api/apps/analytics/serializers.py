from rest_framework import serializers
from .models import AnalyticsSnapshot

class AnalyticsSnapshotSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnalyticsSnapshot
        fields = '__all__'

class TopSkillDemandSerializer(serializers.Serializer):
    skill = serializers.CharField()
    demandIndex = serializers.FloatField()

class SkillGapDistributionSerializer(serializers.Serializer):
    skill = serializers.CharField()
    studentAvg = serializers.FloatField()
    industryRequirement = serializers.FloatField()

class InstitutionSkillAnalyticsSerializer(serializers.Serializer):
    totalStudents = serializers.IntegerField()
    averageSkillReadiness = serializers.FloatField()
    placementRate = serializers.FloatField()
    internshipRate = serializers.FloatField()
    topSkillsDemand = TopSkillDemandSerializer(many=True)
    skillGapDistribution = SkillGapDistributionSerializer(many=True)

class IndustryHiringTrendsSerializer(serializers.Serializer):
    openPositions = serializers.IntegerField()
    applicantsTotal = serializers.IntegerField()
    shortlistedTotal = serializers.IntegerField()
    topDemandedSkills = serializers.ListField(child=serializers.CharField())
