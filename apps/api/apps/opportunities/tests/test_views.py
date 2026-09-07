import unittest
from apps.opportunities.permissions import OpportunityPermission
from common.constants.roles import UserRole

class MockUser:
    def __init__(self, role, is_authenticated=True):
        self.role = role
        self.is_authenticated = is_authenticated
        self.is_staff = False

class MockRequest:
    def __init__(self, user, method='POST'):
        self.user = user
        self.method = method

class OpportunityUnitTest(unittest.TestCase):
    def test_student_cannot_create_opportunity(self):
        perm = OpportunityPermission()
        req = MockRequest(MockUser(UserRole.STUDENT), method='POST')
        self.assertFalse(perm.has_permission(req, None))

    def test_industry_can_create_opportunity(self):
        perm = OpportunityPermission()
        req = MockRequest(MockUser(UserRole.INDUSTRY), method='POST')
        self.assertTrue(perm.has_permission(req, None))

    def test_student_can_read_opportunity(self):
        perm = OpportunityPermission()
        req = MockRequest(MockUser(UserRole.STUDENT), method='GET')
        self.assertTrue(perm.has_permission(req, None))

if __name__ == '__main__':
    unittest.main()
