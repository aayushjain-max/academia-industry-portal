import unittest
from apps.verification.permissions import VerificationPermission
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

class VerificationUnitTest(unittest.TestCase):
    def test_student_cannot_verify_credentials(self):
        perm = VerificationPermission()
        req = MockRequest(MockUser(UserRole.STUDENT), method='POST')
        self.assertFalse(perm.has_permission(req, None))

    def test_academician_can_verify_credentials(self):
        perm = VerificationPermission()
        req = MockRequest(MockUser(UserRole.ACADEMICIAN), method='POST')
        self.assertTrue(perm.has_permission(req, None))

    def test_institution_admin_can_verify_credentials(self):
        perm = VerificationPermission()
        req = MockRequest(MockUser(UserRole.INSTITUTION_ADMIN), method='POST')
        self.assertTrue(perm.has_permission(req, None))

if __name__ == '__main__':
    unittest.main()
