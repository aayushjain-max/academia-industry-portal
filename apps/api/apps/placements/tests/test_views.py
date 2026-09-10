import unittest
from apps.placements.serializers import PlacementSerializer
from apps.placements.permissions import PlacementPermission, PlacementRecordPermission
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

class PlacementUnitTest(unittest.TestCase):
    def test_placement_serializer(self):
        fields = PlacementSerializer.Meta.fields
        self.assertTrue(fields == '__all__' or 'id' in fields or len(fields) > 0)

    def test_student_cannot_create_placement_drive(self):
        perm = PlacementPermission()
        req = MockRequest(MockUser(UserRole.STUDENT), method='POST')
        self.assertFalse(perm.has_permission(req, None))

    def test_industry_can_create_placement_drive(self):
        perm = PlacementPermission()
        req = MockRequest(MockUser(UserRole.INDUSTRY), method='POST')
        self.assertTrue(perm.has_permission(req, None))

    def test_student_cannot_create_placement_record(self):
        perm = PlacementRecordPermission()
        req = MockRequest(MockUser(UserRole.STUDENT), method='POST')
        self.assertFalse(perm.has_permission(req, None))

if __name__ == '__main__':
    unittest.main()

