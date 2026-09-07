import logging
import os
from typing import Dict, Any, Optional
from django.core.mail import send_mail
from django.conf import settings

logger = logging.getLogger(__name__)

class EmailService:
    @staticmethod
    def send_email(
        recipient_email: str,
        subject: str,
        message: str,
        html_message: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Sends transactional email via configured SMTP backend or logs structured output in development/sandbox.
        """
        if not recipient_email:
            logger.warning("[EMAIL DISPATCH] Failed: No recipient email provided.")
            return {"success": False, "status": "FAILED", "error": "No recipient email"}

        from_email = os.getenv('DEFAULT_FROM_EMAIL', 'no-reply@academia-industry-portal.gov.in')
        
        logger.info(f"[EMAIL DISPATCH] To={recipient_email} Subject={subject}")

        try:
            # Attempt to send if email host is configured and not in dummy mode
            if getattr(settings, 'EMAIL_HOST', None) and settings.EMAIL_HOST != 'localhost':
                send_mail(
                    subject=subject,
                    message=message,
                    from_email=from_email,
                    recipient_list=[recipient_email],
                    html_message=html_message,
                    fail_silently=False
                )
                return {
                    "success": True,
                    "status": "DELIVERED",
                    "recipient": recipient_email,
                    "subject": subject
                }
            else:
                return {
                    "success": True,
                    "status": "SENT_SANDBOX",
                    "recipient": recipient_email,
                    "subject": subject
                }
        except Exception as e:
            logger.error(f"[EMAIL DISPATCH ERROR] Failed to send email to {recipient_email}: {str(e)}")
            return {
                "success": False,
                "status": "FAILED",
                "recipient": recipient_email,
                "error": str(e)
            }
