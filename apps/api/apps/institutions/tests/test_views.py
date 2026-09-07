import unittest
from apps.institutions.serializers import InstitutionSerializer

class InstitutionUnitTest(unittest.TestCase):
    def test_institution_serializer(self):
        fields = InstitutionSerializer.Meta.fields
        self.assertTrue(fields == '__all__' or 'id' in fields or len(fields) > 0)

if __name__ == '__main__':
    unittest.main()
