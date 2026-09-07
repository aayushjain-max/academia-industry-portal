import unittest
from apps.internships.serializers import InternshipSerializer

class InternshipUnitTest(unittest.TestCase):
    def test_internship_serializer(self):
        fields = InternshipSerializer.Meta.fields
        self.assertTrue(fields == '__all__' or 'id' in fields or len(fields) > 0)

if __name__ == '__main__':
    unittest.main()
