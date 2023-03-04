from django.db import models
from datetime import datetime

from django.dispatch import receiver
from django.db.models.signals import post_save
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.contrib.auth import get_user_model

User = get_user_model()


class Realtors(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, blank=True, null=True)
    name = models.CharField(max_length=50)

    cv = models.FileField(upload_to='cv/%Y/%m/%d/', null=True, blank=True)
    description = models.TextField(blank=True, max_length=50)
    phone = models.CharField(max_length=20)
    email = models.CharField(max_length=100)
    buyers_agent = models.BooleanField(default=False)
    listing_agent = models.BooleanField(default=False)
    relocation_agent = models.BooleanField(default=False)
    forclosure_agent = models.BooleanField(default=False)

    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return self.name
