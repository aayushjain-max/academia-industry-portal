import logging

logger = logging.getLogger('audit')

class AuditLogMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        if request.user.is_authenticated and request.method not in ('GET', 'HEAD', 'OPTIONS'):
            logger.info(f"AUDIT: User {request.user.id} ({request.user.email}) performed {request.method} on {request.path}")
        return response
