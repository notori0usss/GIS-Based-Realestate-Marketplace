from django.db import models
from datetime import datetime

class Realtor(models.Model):
    name = models.CharField(max_length=50)
    photo = models.ImageField(upload_to='photos/%Y/%m/%d/')
    cv = models.FileField(upload_to='cv/%Y/%m/%d/',null=True,blank=True)
    description = models.TextField(blank=True)
    phone = models.CharField(max_length=20)
    email = models.CharField(max_length=100)
    date_hired = models.DateTimeField(default=datetime.now, blank=True)
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return self.name