import re
from typing import Dict, Any, Optional

class AssistantChat:
    INJECTION_PATTERNS = [
        r"ignore (?:all )?(?:previous|prior) instructions",
        r"disregard (?:all )?(?:rules|guidelines)",
        r"you are now (?:dan|evil|unfiltered)",
        r"bypass (?:security|authorization|rules)",
        r"system override"
    ]

    @classmethod
    def sanitize_prompt(cls, user_message: str) -> str:
        """
        Sanitizes candidate input to mitigate prompt injection attempts.
        """
        clean_text = user_message.strip()
        for pattern in cls.INJECTION_PATTERNS:
            if re.search(pattern, clean_text, re.IGNORECASE):
                return "Please provide standard career guidance and skill development recommendations."
        return clean_text
