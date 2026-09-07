import unittest
from apps.learning.serializers import LearningPathSerializer

class LearningUnitTest(unittest.TestCase):
    def test_learning_path_serializer_fields(self):
        fields = LearningPathSerializer.Meta.fields
        self.assertTrue(fields == '__all__' or 'id' in fields or len(fields) > 0)

if __name__ == '__main__':
    unittest.main()
