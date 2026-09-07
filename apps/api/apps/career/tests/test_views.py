import unittest
from apps.career.permissions import CareerPermission
from common.constants.roles import UserRole

class MockUser:
    def __init__(self, role, is_authenticated=True):
        self.role = role
        self.is_authenticated = is_authenticated
        self.is_staff = False
        self.is_superuser = False

class MockRequest:
    def __init__(self, user):
        self.user = user

class CareerUnitTest(unittest.TestCase):
    def test_unauthenticated_denied(self):
        perm = CareerPermission()
        req = MockRequest(MockUser(UserRole.STUDENT, is_authenticated=False))
        self.assertFalse(perm.has_permission(req, None))

    def test_authenticated_student_allowed(self):
        perm = CareerPermission()
        req = MockRequest(MockUser(UserRole.STUDENT, is_authenticated=True))
        self.assertTrue(perm.has_permission(req, None))

if __name__ == '__main__':
    unittest.main()
