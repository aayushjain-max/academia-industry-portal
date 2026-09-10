import unittest
from apps.internships.serializers import InternshipSerializer
from apps.internships.permissions import InternshipPermission
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

class InternshipUnitTest(unittest.TestCase):
    def test_internship_serializer(self):
        fields = InternshipSerializer.Meta.fields
        self.assertTrue(fields == '__all__' or 'id' in fields or len(fields) > 0)

    def test_student_cannot_create_internship(self):
        perm = InternshipPermission()
        req = MockRequest(MockUser(UserRole.STUDENT), method='POST')
        self.assertFalse(perm.has_permission(req, None))

    def test_industry_can_create_internship(self):
        perm = InternshipPermission()
        req = MockRequest(MockUser(UserRole.INDUSTRY), method='POST')
        self.assertTrue(perm.has_permission(req, None))

    def test_student_can_read_internship(self):
        perm = InternshipPermission()
        req = MockRequest(MockUser(UserRole.STUDENT), method='GET')
        self.assertTrue(perm.has_permission(req, None))

if __name__ == '__main__':
    unittest.main()

