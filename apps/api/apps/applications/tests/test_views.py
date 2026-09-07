import unittest
from apps.applications.models import ApplicationStatus
from apps.applications.serializers import ApplicationSerializer
from common.permissions.object_permissions import CanUpdateApplicationStatus

class ApplicationUnitTest(unittest.TestCase):
    def test_application_serializer_status_read_only(self):
        read_only = ApplicationSerializer.Meta.read_only_fields
        self.assertIn('status', read_only)
        self.assertIn('id', read_only)
        self.assertIn('student', read_only)

    def test_application_status_choices(self):
        valid_choices = [c[0] for c in ApplicationStatus.choices]
        self.assertIn('APPLIED', valid_choices)
        self.assertIn('UNDER_REVIEW', valid_choices)
        self.assertIn('SHORTLISTED', valid_choices)
        self.assertIn('INTERVIEW', valid_choices)
        self.assertIn('ACCEPTED', valid_choices)
        self.assertIn('REJECTED', valid_choices)
        self.assertIn('WITHDRAWN', valid_choices)

if __name__ == '__main__':
    unittest.main()
