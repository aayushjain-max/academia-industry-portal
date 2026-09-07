import unittest
from unittest.mock import MagicMock
from rest_framework.exceptions import ValidationError
from apps.documents.validators import validate_uploaded_file, MAX_FILE_SIZE_BYTES

class DocumentValidationUnitTest(unittest.TestCase):
    def test_valid_pdf_upload(self):
        mock_file = MagicMock()
        mock_file.name = "resume.pdf"
        mock_file.size = 1024 * 1024 # 1 MB
        mock_file.content_type = "application/pdf"
        
        self.assertTrue(validate_uploaded_file(mock_file))

    def test_file_size_exceeded(self):
        mock_file = MagicMock()
        mock_file.name = "large_dataset.pdf"
        mock_file.size = MAX_FILE_SIZE_BYTES + 1000
        mock_file.content_type = "application/pdf"

        with self.assertRaises(ValidationError):
            validate_uploaded_file(mock_file)

    def test_forbidden_extension(self):
        mock_file = MagicMock()
        mock_file.name = "malicious_script.exe"
        mock_file.size = 500
        mock_file.content_type = "application/octet-stream"

        with self.assertRaises(ValidationError):
            validate_uploaded_file(mock_file)

if __name__ == '__main__':
    unittest.main()
