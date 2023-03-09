from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from .serializers import BookingStatusUpdateSerializer, ListingSerializer, BookingSerializer
from listings.models import Listing, Booking
from rest_framework import generics


class ListingList(generics.ListAPIView):
    queryset = Listing.objects.all().order_by("-date_posted")
    serializer_class = ListingSerializer


class BookingList(generics.ListAPIView):
    queryset = Booking.objects.all().order_by('-date_booked')
    serializer_class = BookingSerializer


class BookingCreate(generics.CreateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer


class BookingDetail(generics.RetrieveAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

    def get_object(self):
        booking = get_object_or_404(Booking, pk=self.kwargs.get('pk'))
        listing_id = booking.listing_id
        listing = get_object_or_404(Listing, pk=listing_id)
        return booking


# class BookingUpdateAPIView(generics.UpdateAPIView):
#     queryset = Booking.objects.all()
#     serializer_class = BookingSerializer
#     lookup_field = 'id'

#     def put(self, request, *args, **kwargs):
#         return self.update(request, *args, **kwargs)


class BookingUpdateAPIView(generics.UpdateAPIView):
    serializer_class = BookingStatusUpdateSerializer
    queryset = Booking.objects.all()

    def patch(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', True)
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        status = request.data.get('status')
        rating = request.data.get('rating')
        serializer.save(status=status, rating=rating)
        print(serializer.data)
        return Response(serializer.data)


class BookingDelete(generics.DestroyAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer


class ListingCreate(generics.CreateAPIView):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer


class ListingDetail(generics.RetrieveAPIView):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer


class ListingDelete(generics.DestroyAPIView):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer


class ListingUpdate(generics.UpdateAPIView):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer
