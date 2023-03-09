from rest_framework import serializers
from users.models import Profile
from listings.models import Listing, Booking
from listings.api.serializers import ListingSerializer, BookingSerializer
import math


class NearbySerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = '__all__'


class ProfileSerializer(serializers.ModelSerializer):
    seller_listings = serializers.SerializerMethodField()
    seller_listings_count = serializers.SerializerMethodField()
    my_bookings = serializers.SerializerMethodField()
    my_listings_bookings = serializers.SerializerMethodField()

    def get_my_listings_bookings(self, obj):
        # Get the listings owned by the seller
        listings = Listing.objects.filter(seller=obj.seller.id)
        listing_ids = [listing.id for listing in listings]

        # Get the bookings associated with the seller's listings
        bookings = Booking.objects.filter(listing_id__in=listing_ids)
        booking_serialized = BookingSerializer(bookings, many=True)
        booking_data = booking_serialized.data

        # Add the associated listing object to the serialized data of the bookings
        for booking in booking_data:
            booking_listing = next(
                (listing for listing in listings if listing.id == booking["listing"]), None)
            if booking_listing:
                booking["listing"] = ListingSerializer(booking_listing).data

        return booking_data

    def get_seller_listings(self, obj):
        query = Listing.objects.filter(seller=obj.seller)
        listings_serialized = ListingSerializer(query, many=True)
        return listings_serialized.data

    def get_seller_listings_count(self, obj):
        query = Listing.objects.filter(seller=obj.seller)
        listings_serialized_count = ListingSerializer(query, many=True)
        return len(listings_serialized_count.data)

    def get_my_bookings(self, obj):
        query = Booking.objects.filter(booker=obj.seller.id)
        booking_serialized = BookingSerializer(query, many=True)
        booking_data = booking_serialized.data

        # Filter the Listing objects that match with the Booking objects
        listing_ids = [booking["listing"] for booking in booking_data]
        listings = Listing.objects.filter(id__in=listing_ids)

        # Add the filtered Listing objects to the serialized data of the bookings
        for booking in booking_data:
            booking_listing = next(
                (listing for listing in listings if listing.id == booking["listing"]), None)
            if booking_listing:
                booking["listing"] = ListingSerializer(booking_listing).data

        return booking_data

    class Meta:
        model = Profile
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'profile_picture', 'f_name', 'l_name']


class RecommenderSerializer(serializers.ModelSerializer):
    listing_within_my_radius = serializers.SerializerMethodField()

    def get_listing_within_my_radius(self, obj):
        try:
            R = 6371  # radius of Earth in km
            query = Listing.objects.all()
            nearby_properties = []
            for property in query:
                if property.latitude and property.longitude and obj.latitude and obj.longitude:
                    lat1, lon1 = math.radians(
                        obj.latitude), math.radians(obj.longitude)
                    lat2, lon2 = math.radians(
                        property.latitude), math.radians(property.longitude)
                    dlat = lat2 - lat1
                    dlon = lon2 - lon1
                    a = math.sin(dlat / 2) ** 2 + math.cos(lat1) * \
                        math.cos(lat2) * math.sin(dlon / 2) ** 2
                    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
                    distance = R * c
                    if distance <= 100:  # 5 km radius
                        nearby_properties.append((property, distance))
            nearby_properties.sort(key=lambda x: x[1])  # sort by distance
            # get the closest 3 properties
            closest_properties = [p[0] for p in nearby_properties[:6]]
            query_serialized = NearbySerializer(closest_properties, many=True)
            return query_serialized.data
        except AttributeError as e:
            print("err", e)
            return None

    class Meta:
        model = Profile
        fields = '__all__'
