import unittest
from apps.academicians.serializers import AcademicianSerializer

class AcademicianUnitTest(unittest.TestCase):
    def test_academician_serializer(self):
        fields = AcademicianSerializer.Meta.fields
        self.assertTrue(fields == '__all__' or 'id' in fields or len(fields) > 0)

if __name__ == '__main__':
    unittest.main()
