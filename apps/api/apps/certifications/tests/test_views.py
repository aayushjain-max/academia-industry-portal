import unittest
from apps.certifications.permissions import CertificationPermission

class MockUser:
    def __init__(self, is_authenticated=True):
        self.is_authenticated = is_authenticated
        self.is_staff = False
        self.is_superuser = False
        self.role = 'STUDENT'

class MockRequest:
    def __init__(self, user, method='GET'):
        self.user = user
        self.method = method

class MockCert:
    def __init__(self, user):
        self.user = user

class CertificationUnitTest(unittest.TestCase):
    def test_cert_permission_unauth(self):
        perm = CertificationPermission()
        req = MockRequest(MockUser(is_authenticated=False))
        self.assertFalse(perm.has_permission(req, None))

    def test_cert_permission_auth(self):
        perm = CertificationPermission()
        req = MockRequest(MockUser(is_authenticated=True))
        self.assertTrue(perm.has_permission(req, None))

if __name__ == '__main__':
    unittest.main()
