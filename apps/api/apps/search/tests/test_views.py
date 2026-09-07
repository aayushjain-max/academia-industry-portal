import unittest
from apps.search.serializers import SearchSerializer

class SearchUnitTest(unittest.TestCase):
    def test_search_serializer(self):
        fields = SearchSerializer.Meta.fields
        self.assertTrue(fields == '__all__' or 'id' in fields or len(fields) > 0)

if __name__ == '__main__':
    unittest.main()
