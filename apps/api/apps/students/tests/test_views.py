import unittest
from apps.students.permissions import StudentPermission
from common.constants.roles import UserRole

class MockUser:
    def __init__(self, role, is_authenticated=True):
        self.role = role
        self.is_authenticated = is_authenticated
        self.is_staff = False
        self.is_superuser = False

class MockStudentProfile:
    def __init__(self, user):
        self.user = user

class StudentProfileUnitTest(unittest.TestCase):
    def test_owner_can_modify_profile(self):
        perm = StudentPermission()
        user1 = MockUser(UserRole.STUDENT)
        user2 = MockUser(UserRole.STUDENT)
        prof1 = MockStudentProfile(user=user1)

        class MockReq:
            def __init__(self, u, m='PATCH'):
                self.user = u
                self.method = m

        self.assertTrue(perm.has_object_permission(MockReq(user1), None, prof1))
        self.assertFalse(perm.has_object_permission(MockReq(user2), None, prof1))

    def test_recruiter_can_view_profile(self):
        perm = StudentPermission()
        user1 = MockUser(UserRole.STUDENT)
        recruiter = MockUser(UserRole.INDUSTRY)
        prof1 = MockStudentProfile(user=user1)

        class MockReq:
            def __init__(self, u, m='GET'):
                self.user = u
                self.method = m

        self.assertTrue(perm.has_object_permission(MockReq(recruiter), None, prof1))

if __name__ == '__main__':
    unittest.main()
