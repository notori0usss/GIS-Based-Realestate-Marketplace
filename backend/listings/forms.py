from django import forms
from django.contrib.gis.geos import Point
from .models import PointInterest, Booking


class PoisForm(forms.ModelForm):
    latitude = forms.FloatField()
    longitude = forms.FloatField()

    class Meta:
        model = PointInterest
        fields = ['name', 'type', 'location', 'latitude', 'longitude']

    def clean(self):
        data = super().clean()
        latitude = data.pop('latitude')
        longitude = data.pop('longitude')
        data['location'] = Point(latitude, longitude, srid=4326)
        return data

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        location = self.initial.get('location')
        if isinstance(location, Point):
            self.initial['latitude'] = location.tuple[0]
            self.initial['longitude'] = location.tuple[1]


class BookingForm(forms.ModelForm):
    class Meta:
        model = Booking
        fields = ['user', 'seller', 'listing', 'date_booked', 'status']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['listing'].widget.attrs['readonly'] = True
