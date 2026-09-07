import unittest
from apps.notifications.services.sms import SMSService
from apps.notifications.services.whatsapp import WhatsAppService
from apps.notifications.services.email import EmailService

class NotificationChannelUnitTest(unittest.TestCase):
    def test_whatsapp_phone_normalization(self):
        res = WhatsAppService.send_whatsapp_message("9876543210", "Test Alert")
        self.assertTrue(res["success"])
        self.assertEqual(res["recipient"], "+919876543210")

    def test_sms_dispatch_sandbox(self):
        res = SMSService.send_sms("9876543210", "Verification OTP 123456")
        self.assertTrue(res["success"])
        self.assertIn("SENT_SANDBOX", res["status"])

    def test_email_dispatch_empty_recipient_fails(self):
        res = EmailService.send_email("", "Subject", "Body")
        self.assertFalse(res["success"])
        self.assertEqual(res["status"], "FAILED")

if __name__ == '__main__':
    unittest.main()
