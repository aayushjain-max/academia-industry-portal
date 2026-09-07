import logging
from typing import Optional, Dict, Any
from django.conf import settings
from apps.notifications.models import Notification
from apps.notifications.services.sms import SMSService
from apps.notifications.services.whatsapp import WhatsAppService
from apps.notifications.services.email import EmailService

logger = logging.getLogger(__name__)

class NotificationService:
    @staticmethod
    def send_notification(
        user,
        title: str,
        message: str,
        channel: str = 'IN_APP',
        notification_type: str = 'SYSTEM_ALERT',
        link_url: Optional[str] = None,
        phone_number: Optional[str] = None,
        recipient_email: Optional[str] = None
    ) -> Notification:
        # Create In-App Notification record
        notification = Notification.objects.create(
            user=user,
            title=title,
            message=message,
            channel=channel,
            type=notification_type,
            link_url=link_url
        )

        recipient_phone = phone_number or getattr(user, 'phone', None)
        target_email = recipient_email or getattr(user, 'email', None)

        if channel == 'EMAIL' and target_email:
            EmailService.send_email(target_email, title, message)
        elif channel == 'SMS' and recipient_phone:
            SMSService.send_sms(recipient_phone, f"[{title}] {message}")
        elif channel == 'WHATSAPP' and recipient_phone:
            WhatsAppService.send_whatsapp_message(recipient_phone, f"*{title}*\n\n{message}")

        return notification
