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
        Sanitizes candidate input to mitigate prompt injection attempts and enforce length limits.
        """
        if not user_message:
            return ""
        clean_text = user_message.strip()[:2000]
        for pattern in cls.INJECTION_PATTERNS:
            if re.search(pattern, clean_text, re.IGNORECASE):
                return "Please provide standard career guidance and skill development recommendations."
        return clean_text

    @classmethod
    def format_user_prompt(cls, user_message: str) -> str:
        """
        Wraps user query in explicit isolation tags.
        """
        sanitized = cls.sanitize_prompt(user_message)
        return f"<candidate_query>\n{sanitized}\n</candidate_query>"
