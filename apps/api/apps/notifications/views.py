from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Notification
from .serializers import NotificationSerializer

class NotificationViewSet(viewsets.ModelViewSet):
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        notification = serializer.save(user=self.request.user)
        channel = notification.channel

        # Only allow staff/admin to target arbitrary external recipients; regular users can only notify their own registered contacts
        if self.request.user.is_staff or self.request.user.is_superuser:
            phone = self.request.data.get('phone_number') or getattr(self.request.user, 'phone', None)
            email = self.request.data.get('recipient_email') or getattr(self.request.user, 'email', None)
        else:
            phone = getattr(self.request.user, 'phone', None) or getattr(self.request.user, 'phone_number', None)
            email = getattr(self.request.user, 'email', None)

        if channel == 'SMS' and phone:
            from apps.notifications.services.sms import SMSService
            SMSService.send_sms(phone, f"[{notification.title}] {notification.message}")
        elif channel == 'WHATSAPP' and phone:
            from apps.notifications.services.whatsapp import WhatsAppService
            WhatsAppService.send_whatsapp_message(phone, f"*{notification.title}*\n\n{notification.message}")
        elif channel == 'EMAIL' and email:
            from apps.notifications.services.email import EmailService
            EmailService.send_email(email, notification.title, notification.message)

    @action(detail=True, methods=['post'], url_path='read')
    def mark_read(self, request, pk=None):
        notification = self.get_object()
        notification.is_read = True
        notification.save()
        return Response({"success": True})

    @action(detail=True, methods=['post'], url_path='mark_read')
    def mark_read_legacy(self, request, pk=None):
        return self.mark_read(request, pk)

    @action(detail=False, methods=['post'], url_path='mark-all-read')
    def mark_all_read(self, request):
        self.get_queryset().filter(is_read=False).update(is_read=True)
        return Response({"success": True})

    @action(detail=False, methods=['post'], url_path='mark_all_read')
    def mark_all_read_legacy(self, request):
        return self.mark_all_read(request)

    @action(detail=False, methods=['get'], url_path='unread-count')
    def unread_count(self, request):
        count = self.get_queryset().filter(is_read=False).count()
        return Response({"unreadCount": count})
