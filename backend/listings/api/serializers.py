from rest_framework import serializers
from listings.models import Listing, PointInterest
from django.contrib.gis.measure import D
from django.contrib.gis.geos import Point


class ListingSerializer(serializers.ModelSerializer):
    country = serializers.SerializerMethodField()
    seller_username = serializers.SerializerMethodField()
    seller_agency_name = serializers.SerializerMethodField()
    seller_profile_picture = serializers.SerializerMethodField()
    listing_pois_within_radius = serializers.SerializerMethodField()

    def get_listing_pois_within_radius(self, obj):
        listing_location = Point(obj.latitude, obj.longitude, srid=4326)
        query = PointInterest.objects.filter(
            location__distance_lt=(listing_location, D(km=1.1)))
        query_serialized = PoiSerializer(query, many=True)
        return query_serialized.data

    def get_seller_agency_name(self, obj):
        return obj.seller.profile.agency_name

    def get_seller_profile_picture(self, obj):
        return obj.seller.profile.profile_picture.url

    def get_seller_username(self, obj):
        try:
            return obj.seller.username
        except AttributeError as e:
            print("AttributeError:", e)
            return None

    def get_country(self, obj):
        return "Nepal"

    class Meta:
        model = Listing
        fields = '__all__'


class PoiSerializer(serializers.ModelSerializer):
    class Meta:
        model = PointInterest
        fields = '__all__'
