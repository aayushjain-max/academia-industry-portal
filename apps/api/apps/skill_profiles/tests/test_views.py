import unittest
from apps.skill_profiles.serializers import SkillProfileSerializer

class SkillProfileUnitTest(unittest.TestCase):
    def test_skill_profile_serializer(self):
        fields = SkillProfileSerializer.Meta.fields
        self.assertTrue(fields == '__all__' or 'id' in fields or len(fields) > 0)

if __name__ == '__main__':
    unittest.main()
