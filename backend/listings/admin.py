from django.contrib import admin
from listings.models import Listing
from listings.models import PointInterest
from .forms import PoisForm

class PoiAdmin(admin.ModelAdmin):
    form = PoisForm


admin.site.register(Listing)
admin.site.register(PointInterest,PoiAdmin)



