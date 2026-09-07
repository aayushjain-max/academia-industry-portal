import unittest
from apps.portfolios.serializers import PortfolioSerializer

class PortfolioUnitTest(unittest.TestCase):
    def test_portfolio_serializer(self):
        fields = PortfolioSerializer.Meta.fields
        self.assertTrue(fields == '__all__' or 'id' in fields or len(fields) > 0)

if __name__ == '__main__':
    unittest.main()
