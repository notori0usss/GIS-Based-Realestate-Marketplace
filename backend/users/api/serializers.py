from rest_framework import serializers
from users.models import Profile
from listings.models import Listing
from listings.api.serializers import ListingSerializer


class ProfileSerializer(serializers.ModelSerializer):
    seller_listings=serializers.SerializerMethodField()
    seller_listings_count=serializers.SerializerMethodField()

    def get_seller_listings(self,obj):
        query=Listing.objects.filter(seller=obj.seller)
        listings_serialized=ListingSerializer(query,many=True)
        return listings_serialized.data

    def get_seller_listings_count(self,obj):
        query=Listing.objects.filter(seller=obj.seller)
        listings_serialized_count=ListingSerializer(query,many=True)
        return len(listings_serialized_count.data)
    
    class Meta:
        model=Profile
        fields='__all__'