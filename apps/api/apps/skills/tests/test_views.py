import unittest
from apps.skills.serializers import SkillSerializer

class SkillUnitTest(unittest.TestCase):
    def test_skill_serializer(self):
        fields = SkillSerializer.Meta.fields
        self.assertTrue(fields == '__all__' or 'name' in fields or len(fields) > 0)

if __name__ == '__main__':
    unittest.main()
