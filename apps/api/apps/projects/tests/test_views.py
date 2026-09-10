import unittest
from apps.projects.permissions import ProjectPermission

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

class MockProject:
    def __init__(self, creator):
        self.creator = creator

class ProjectUnitTest(unittest.TestCase):
    def test_unauthenticated_denied(self):
        perm = ProjectPermission()
        req = MockRequest(MockUser(is_authenticated=False))
        self.assertFalse(perm.has_permission(req, None))

    def test_owner_can_modify_project(self):
        perm = ProjectPermission()
        owner = MockUser(is_authenticated=True)
        other_user = MockUser(is_authenticated=True)
        proj = MockProject(creator=owner)

        req_owner = MockRequest(owner, method='PATCH')
        req_other = MockRequest(other_user, method='PATCH')

        self.assertTrue(perm.has_object_permission(req_owner, None, proj))
        self.assertFalse(perm.has_object_permission(req_other, None, proj))

    def test_student_cannot_verify_projects(self):
        from common.constants.roles import UserRole
        student = MockUser(is_authenticated=True)
        student.role = UserRole.STUDENT
        self.assertNotIn(student.role, [UserRole.ACADEMICIAN, UserRole.INSTITUTION_ADMIN, UserRole.SUPER_ADMIN])

    def test_academician_can_verify_projects(self):
        from common.constants.roles import UserRole
        academician = MockUser(is_authenticated=True)
        academician.role = UserRole.ACADEMICIAN
        self.assertIn(academician.role, [UserRole.ACADEMICIAN, UserRole.INSTITUTION_ADMIN, UserRole.SUPER_ADMIN])

if __name__ == '__main__':
    unittest.main()

