import unittest
from apps.placements.serializers import PlacementSerializer

class PlacementUnitTest(unittest.TestCase):
    def test_placement_serializer(self):
        fields = PlacementSerializer.Meta.fields
        self.assertTrue(fields == '__all__' or 'id' in fields or len(fields) > 0)

if __name__ == '__main__':
    unittest.main()
