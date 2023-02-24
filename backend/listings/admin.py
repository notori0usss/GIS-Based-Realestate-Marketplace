from django.contrib import admin
from listings.models import Listing
from listings.models import PointInterest, Booking
from .forms import PoisForm, BookingForm


class PoiAdmin(admin.ModelAdmin):
    form = PoisForm


class BookingAdmin(admin.ModelAdmin):
    form = BookingForm


admin.site.register(Listing)
admin.site.register(PointInterest, PoiAdmin)
admin.site.register(Booking, BookingAdmin)
