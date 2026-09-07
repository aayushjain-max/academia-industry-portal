import unittest
from common.constants.roles import UserRole
from common.permissions.roles import IsStudent, IsIndustry, IsAcademician, IsInstitutionAdmin, IsSuperAdmin

class MockUser:
    def __init__(self, role, is_authenticated=True, is_staff=False, is_superuser=False):
        self.role = role
        self.is_authenticated = is_authenticated
        self.is_staff = is_staff
        self.is_superuser = is_superuser

class MockRequest:
    def __init__(self, user):
        self.user = user

class RolePermissionsUnitTest(unittest.TestCase):
    def test_student_permission_check(self):
        perm = IsStudent()
        student_req = MockRequest(MockUser(UserRole.STUDENT))
        industry_req = MockRequest(MockUser(UserRole.INDUSTRY))
        
        self.assertTrue(perm.has_permission(student_req, None))
        self.assertFalse(perm.has_permission(industry_req, None))

    def test_industry_permission_check(self):
        perm = IsIndustry()
        industry_req = MockRequest(MockUser(UserRole.INDUSTRY))
        student_req = MockRequest(MockUser(UserRole.STUDENT))

        self.assertTrue(perm.has_permission(industry_req, None))
        self.assertFalse(perm.has_permission(student_req, None))

    def test_superadmin_permission_check(self):
        perm = IsSuperAdmin()
        super_req = MockRequest(MockUser(UserRole.SUPER_ADMIN, is_superuser=True))
        student_req = MockRequest(MockUser(UserRole.STUDENT))

        self.assertTrue(perm.has_permission(super_req, None))
        self.assertFalse(perm.has_permission(student_req, None))

if __name__ == '__main__':
    unittest.main()
