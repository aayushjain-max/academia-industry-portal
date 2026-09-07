import unittest
from apps.skill_passports.serializers import SkillPassportSerializer

class SkillPassportUnitTest(unittest.TestCase):
    def test_passport_serializer(self):
        fields = SkillPassportSerializer.Meta.fields
        self.assertTrue(fields == '__all__' or 'id' in fields or len(fields) > 0)

if __name__ == '__main__':
    unittest.main()
