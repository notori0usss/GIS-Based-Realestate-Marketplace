from .serializers import RealtorSerializer
from rest_framework import generics
from realtors.models import Realtors


class RealtorList(generics.ListAPIView):
    queryset = Realtors.objects.all()
    serializer_class = RealtorSerializer


class RealtorDetail(generics.RetrieveAPIView):
    queryset = Realtors.objects.all()
    serializer_class = RealtorSerializer


class RealtorUpdate(generics.UpdateAPIView):
    queryset = Realtors.objects.all()
    serializer_class = RealtorSerializer


class RealtorCreate(generics.CreateAPIView):
    queryset = Realtors.objects.all()
    serializer_class = RealtorSerializer


class IsVerifiedView(generics.ListAPIView):
    queryset = Realtors.objects.filter(is_verified=True)
    serializer_class = RealtorSerializer
