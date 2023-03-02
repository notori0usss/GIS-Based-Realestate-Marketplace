from django.db import models
from datetime import datetime


class Realtors(models.Model):
    name = models.CharField(max_length=50)
    photo = models.ImageField(upload_to='media/realtor/%Y/%m/%d/')
    cv = models.FileField(upload_to='cv/%Y/%m/%d/', null=True, blank=True)
    description = models.TextField(blank=True, max_length=50)
    phone = models.CharField(max_length=20)
    email = models.CharField(max_length=100)
    choices_agent = (
        ('Buyers Agent', 'Buyers Agent'),
        ('Listing Agent', 'Listing Agen'),
        ('Relocation', 'Relocation'),
        ('Forclosure', 'Forclosure'),
        ('Other', 'Other'),
    )
    agent_type = models.CharField(
        max_length=100, choices=choices_agent, default='Other')
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return self.name
