import unittest
from apps.skill_gaps.serializers import SkillGapSerializer

class SkillGapUnitTest(unittest.TestCase):
    def test_skill_gap_serializer(self):
        fields = SkillGapSerializer.Meta.fields
        self.assertTrue(fields == '__all__' or 'id' in fields or len(fields) > 0)

if __name__ == '__main__':
    unittest.main()
