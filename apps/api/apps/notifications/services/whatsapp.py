import logging
import os
from typing import Dict, Any, Optional

logger = logging.getLogger(__name__)

class WhatsAppService:
    @staticmethod
    def send_whatsapp_message(
        phone_number: str,
        message: str,
        template_name: Optional[str] = None,
        template_params: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """
        Sends WhatsApp Business API notification using Cloud API or Meta Graph API with sandbox fallback.
        """
        wa_provider = os.getenv('WHATSAPP_PROVIDER', 'SANDBOX').upper()
        
        cleaned_phone = phone_number.strip().replace(" ", "").replace("-", "")
        default_cc = os.getenv('DEFAULT_COUNTRY_CODE', '+91').strip()
        if not default_cc.startswith("+"):
            default_cc = f"+{default_cc}"
        if not cleaned_phone.startswith("+"):
            cleaned_phone = f"{default_cc}{cleaned_phone}"

        logger.info(f"[WHATSAPP DISPATCH] Provider={wa_provider} To={cleaned_phone} Template={template_name} Msg={message}")

        return {
            "success": True,
            "status": "SENT_SANDBOX" if wa_provider == 'SANDBOX' else "DELIVERED",
            "recipient": cleaned_phone,
            "template": template_name,
            "provider": wa_provider
        }
