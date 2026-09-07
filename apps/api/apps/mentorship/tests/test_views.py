import unittest
from apps.mentorship.permissions import MentorshipPermission

class MockUser:
    def __init__(self, is_authenticated=True):
        self.is_authenticated = is_authenticated
        self.is_staff = False
        self.is_superuser = False
        self.role = 'STUDENT'

class MockRequest:
    def __init__(self, user):
        self.user = user

class MockMentorship:
    def __init__(self, user):
        self.user = user

class MentorshipUnitTest(unittest.TestCase):
    def test_unauthenticated_denied(self):
        perm = MentorshipPermission()
        req = MockRequest(MockUser(is_authenticated=False))
        self.assertFalse(perm.has_permission(req, None))

    def test_owner_object_access(self):
        perm = MentorshipPermission()
        user1 = MockUser()
        user2 = MockUser()
        m = MockMentorship(user=user1)

        self.assertTrue(perm.has_object_permission(MockRequest(user1), None, m))
        self.assertFalse(perm.has_object_permission(MockRequest(user2), None, m))

if __name__ == '__main__':
    unittest.main()
