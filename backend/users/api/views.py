from users.models import Profile
from .serializers import ProfileSerializer, UserSerializer
from rest_framework import generics


class ProfileList(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class ProfileDetail(generics.RetrieveAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    lookup_field = 'seller'


class UserDetail(generics.RetrieveAPIView):
    queryset = Profile.objects.all()
    serializer_class = UserSerializer


class ProfileUpdate(generics.UpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    lookup_field = 'seller'
