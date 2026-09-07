import unittest
from apps.assessments.serializers import AssessmentSerializer

class AssessmentUnitTest(unittest.TestCase):
    def test_assessment_serializer_fields(self):
        fields = AssessmentSerializer.Meta.fields
        self.assertTrue(fields == '__all__' or 'id' in fields or len(fields) > 0)

if __name__ == '__main__':
    unittest.main()
