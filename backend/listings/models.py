from django.contrib.gis.db import models
from django.utils import timezone
from django.contrib.gis.geos import Point
from random import choices
from django.contrib.auth import get_user_model
from users.models import Profile

User = get_user_model()


class Listing(models.Model):
    seller = models.ForeignKey(
        User, on_delete=models.CASCADE, blank=True, null=True)
    title = models.CharField(max_length=150)
    description = models.TextField(null=True, blank=True)

    choices_area = (
        ('Kathmandu', 'Kathmandu'),
        ('Bhaktapur', 'Bhaktapur'),
    )
    area = models.CharField(max_length=20, blank=True,
                            null=True, choices=choices_area)

    municipality = models.CharField(max_length=50, blank=True, null=True)
    choices_listing_type = (
        ('House', 'House'),
        ('Apartment', 'Apartment'),
        ('Office', 'Office'),
    )
    listing_type = models.CharField(
        max_length=20, choices=choices_listing_type)

    choices_property_status = (
        ('Sale', 'Sale'),
        ('Rent', 'Rent'),
        ('Auction', 'Auction'),
    )
    property_status = models.CharField(
        max_length=20, blank=True, null=True, choices=choices_property_status)

    price = models.DecimalField(max_digits=50, decimal_places=0)
    choices_rental_frequency = (
        ('Month', 'Month'),
        ('Week', 'Week'),
        ('Day', 'Day'),
    )

    rental_frequency = models.CharField(
        max_length=20, blank=True, null=True, choices=choices_rental_frequency)

    rooms = models.IntegerField(blank=True, null=True)
    furnished = models.BooleanField(default=False, null=True)
    pool = models.BooleanField(default=False)
    elevator = models.BooleanField(default=False)
    cctv = models.BooleanField(default=False)
    parking = models.IntegerField(blank=True, null=True)
    date_posted = models.DateTimeField(default=timezone.now)
    property_area = models.IntegerField(blank=True, null=True)
    latitude = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)
    bathroom = models.IntegerField(blank=True, null=True)
    picture1 = models.ImageField(
        blank=True, null=True, upload_to="pictures/%Y,%m/%d/")
    picture2 = models.ImageField(
        blank=True, null=True, upload_to="pictures/%Y,%m/%d/")
    picture3 = models.ImageField(
        blank=True, null=True, upload_to="pictures/%Y,%m/%d/")

    bathPicture1 = models.ImageField(
        blank=True, null=True, upload_to="pictures/%Y,%m/%d/")

    bathPicture2 = models.ImageField(
        blank=True, null=True, upload_to="pictures/%Y,%m/%d/")
    bedroomPicture1 = models.ImageField(
        blank=True, null=True, upload_to="pictures/%Y,%m/%d/")
    bedroomPicture2 = models.ImageField(
        blank=True, null=True, upload_to="pictures/%Y,%m/%d/")

    comments = models.JSONField(blank=True, null=True, default=list)


def __str__(self):
    return self.title


class PointInterest(models.Model):
    name = models.CharField(max_length=120, blank=True, null=True)
    choices_type = (
        ('University', 'University'),
        ('Hospital', 'Hospital'),
        ('Stadium', 'Stadium'),
        ('Resturant', 'Resturant'),
        ('Airport', 'Airport'),
        ('Tourist', 'Tourist'),
    )
    type = models.CharField(max_length=50, choices=choices_type)
    location = models.PointField(srid=4326, blank=True, null=True)

    def __str__(self):
        return self.name


class Booking(models.Model):
    booker = models.IntegerField(blank=True, null=True)
    seller = models.IntegerField(blank=True, null=True)
    f_name = models.CharField(max_length=10, null=True)
    l_name = models.CharField(max_length=10, null=True)

    listing = models.ForeignKey(Listing, on_delete=models.CASCADE)
    date_booked = models.DateTimeField(default=timezone.now)
    choices_status = (
        ('Pending', 'Pending'),
        ('Approved', 'Approved'),
        ('Rejected', 'Rejected'),
    )
    status = models.CharField(
        max_length=50, choices=choices_status, default='Pending')

    def __str__(self):
        return f"{self.booker} booked {self.listing.title}"
