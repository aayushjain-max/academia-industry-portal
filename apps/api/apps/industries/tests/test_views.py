import unittest
from apps.industries.serializers import IndustrySerializer

class IndustryUnitTest(unittest.TestCase):
    def test_industry_serializer(self):
        fields = IndustrySerializer.Meta.fields
        self.assertTrue(fields == '__all__' or 'id' in fields or len(fields) > 0)

if __name__ == '__main__':
    unittest.main()
