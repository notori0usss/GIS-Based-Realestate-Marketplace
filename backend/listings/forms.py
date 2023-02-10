from django import forms
from django.contrib.gis.geos import Point
from .models import PointInterest
class PoisForm(forms.ModelForm):
    latitude = forms.FloatField()
    longitude = forms.FloatField()

    class Meta:
        model=PointInterest
        fields=['name','type','location', 'latitude', 'longitude']

    
    def clean(self):
        data = super().clean()
        latitude = data.pop('latitude')
        longitude = data.pop('longitude')
        data['location'] = Point(latitude, longitude, srid=32645)
        return data

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        location = self.initial.get('location')
        if isinstance(location, Point):
            self.initial['latitude'] = location.tuple[0]
            self.initial['longitude'] = location.tuple[1]
