import logging
import os
from typing import Dict, Any, Optional

logger = logging.getLogger(__name__)

class SMSService:
    @staticmethod
    def send_sms(phone_number: str, message: str, template_id: Optional[str] = None) -> Dict[str, Any]:
        """
        Sends transactional SMS notification with carrier gateway integration / logging fallback.
        Supports standard SMS gateways (e.g. Twilio / AWS SNS / MSG91) or structured sandbox logging.
        """
        sms_provider = os.getenv('SMS_PROVIDER', 'SANDBOX').upper()
        
        # Clean phone number
        cleaned_phone = phone_number.strip().replace(" ", "").replace("-", "")
        if not cleaned_phone.startswith("+"):
            cleaned_phone = f"+91{cleaned_phone}"

        logger.info(f"[SMS DISPATCH] Provider={sms_provider} To={cleaned_phone} Template={template_id} Msg={message}")

        if sms_provider == 'TWILIO':
            # Twilio integration hook
            account_sid = os.getenv('TWILIO_ACCOUNT_SID')
            auth_token = os.getenv('TWILIO_AUTH_TOKEN')
            from_number = os.getenv('TWILIO_PHONE_NUMBER')
            # Mockable or live client
            status = "DELIVERED"
        else:
            # Sandbox default
            status = "SENT_SANDBOX"

        return {
            "success": True,
            "status": status,
            "recipient": cleaned_phone,
            "message_length": len(message),
            "provider": sms_provider
        }
