import unittest
from apps.audit.serializers import AuditLogSerializer

class AuditUnitTest(unittest.TestCase):
    def test_audit_serializer_structure(self):
        fields = AuditLogSerializer.Meta.fields
        self.assertTrue(fields == '__all__' or 'id' in fields or len(fields) > 0)

if __name__ == '__main__':
    unittest.main()
