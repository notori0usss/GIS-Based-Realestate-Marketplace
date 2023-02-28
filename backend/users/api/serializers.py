from rest_framework import serializers
from users.models import Profile
from listings.models import Listing, Booking
from listings.api.serializers import ListingSerializer, BookingSerializer


class ProfileSerializer(serializers.ModelSerializer):
    seller_listings = serializers.SerializerMethodField()
    seller_listings_count = serializers.SerializerMethodField()
    my_bookings = serializers.SerializerMethodField()

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
