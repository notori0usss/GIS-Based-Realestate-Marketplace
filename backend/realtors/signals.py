from django.core.mail import send_mail
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Realtors


@receiver(post_save, sender=Realtors)
def send_verification_email(sender, instance, **kwargs):
    if instance.is_verified and not kwargs.get('raw', False):
        subject = 'Confirmation of Employment'
        message = f'Dear {instance.name},\n\nCongratulations on being hired as a realtor at DigiDalal! We are excited to have you join our team and we look forward to seeing all the great work you will do.\n\nPlease feel free to reach out to us if you have any questions or concerns.\n\nSincerely,\nThe DigiDalal Team'
        from_email = 'noreply@digidalal.com'
        recipient_list = [instance.email]
        send_mail(subject, message, from_email, recipient_list)
