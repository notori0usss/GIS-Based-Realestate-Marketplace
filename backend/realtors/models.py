from django.db import models
from datetime import datetime


class Realtors(models.Model):
    name = models.CharField(max_length=50)
    photo = models.ImageField(upload_to='media/realtor/%Y/%m/%d/')
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
