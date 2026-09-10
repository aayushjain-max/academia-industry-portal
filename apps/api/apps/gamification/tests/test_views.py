import unittest
from apps.gamification.serializers import BadgeSerializer

class GamificationUnitTest(unittest.TestCase):
    def test_badge_serializer_structure(self):
        fields = BadgeSerializer.Meta.fields
        self.assertIn('name', fields)
        self.assertIn('category', fields)
        self.assertIn('points_reward', fields)


if __name__ == '__main__':
    unittest.main()
