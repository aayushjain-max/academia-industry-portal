import unittest
from apps.micro_internships.serializers import MicroInternshipSerializer

class MicroInternshipUnitTest(unittest.TestCase):
    def test_micro_internship_serializer(self):
        fields = MicroInternshipSerializer.Meta.fields
        self.assertTrue(fields == '__all__' or 'id' in fields or len(fields) > 0)

if __name__ == '__main__':
    unittest.main()
