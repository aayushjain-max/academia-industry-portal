import unittest
from apps.analytics.permissions import AnalyticsPermission
from common.constants.roles import UserRole

class MockUser:
    def __init__(self, role, is_authenticated=True, is_staff=False):
        self.role = role
        self.is_authenticated = is_authenticated
        self.is_staff = is_staff

class MockRequest:
    def __init__(self, user):
        self.user = user

class AnalyticsPermissionUnitTest(unittest.TestCase):
    def test_student_cannot_access_institution_analytics(self):
        perm = AnalyticsPermission()
        req = MockRequest(MockUser(UserRole.STUDENT))
        self.assertFalse(perm.has_permission(req, None))

    def test_institution_admin_can_access_analytics(self):
        perm = AnalyticsPermission()
        req = MockRequest(MockUser(UserRole.INSTITUTION_ADMIN))
        self.assertTrue(perm.has_permission(req, None))

    def test_superadmin_can_access_analytics(self):
        perm = AnalyticsPermission()
        req = MockRequest(MockUser(UserRole.SUPER_ADMIN, is_staff=True))
        self.assertTrue(perm.has_permission(req, None))

if __name__ == '__main__':
    unittest.main()
