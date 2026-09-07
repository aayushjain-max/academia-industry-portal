import unittest
from apps.authentication.serializers import RegisterSerializer, LoginSerializer, UserDetailSerializer
from common.constants.roles import UserRole

class AuthenticationUnitTest(unittest.TestCase):
    def test_register_serializer_role_validation(self):
        # Valid student registration payload
        valid_data = {
            'email': 'student.test@portal.edu',
            'password': 'SecurePassword123!',
            'role': UserRole.STUDENT,
            'first_name': 'Test',
            'last_name': 'Student'
        }
        serializer = RegisterSerializer(data=valid_data)
        self.assertTrue(serializer.is_valid(), serializer.errors)

    def test_register_serializer_disallows_superadmin(self):
        # Disallow privilege escalation on public registration
        invalid_data = {
            'email': 'hacker@portal.edu',
            'password': 'InsecurePassword123!',
            'role': UserRole.SUPER_ADMIN,
        }
        serializer = RegisterSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('role', serializer.errors)

    def test_user_detail_serializer_read_only_fields(self):
        # Ensure role and is_email_verified are read-only
        read_only_fields = UserDetailSerializer.Meta.read_only_fields
        self.assertIn('role', read_only_fields)
        self.assertIn('is_email_verified', read_only_fields)
        self.assertIn('id', read_only_fields)

if __name__ == '__main__':
    unittest.main()
