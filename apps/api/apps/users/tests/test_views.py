import unittest
from apps.users.serializers import UserSerializer, UserUpdateSerializer

class UsersUnitTest(unittest.TestCase):
    def test_user_serializer_read_only(self):
        read_only = UserSerializer.Meta.read_only_fields
        self.assertIn('id', read_only)
        self.assertIn('created_at', read_only)

    def test_user_update_serializer_omits_role(self):
        # Role cannot be updated by user self-service serializer
        fields = UserUpdateSerializer.Meta.fields
        self.assertNotIn('role', fields)
        self.assertNotIn('is_superuser', fields)
        self.assertNotIn('is_staff', fields)

if __name__ == '__main__':
    unittest.main()
