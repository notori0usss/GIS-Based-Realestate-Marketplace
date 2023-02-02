from rest_framework.generics import ListAPIView, RetrieveAPIView,UpdateAPIView
from rest_framework import permissions
from .models import Realtor
from .serializers import RealtorSerializer

class RealtorListView(ListAPIView):
    permission_classes = (permissions.AllowAny, )
    queryset = Realtor.objects.all()
    serializer_class = RealtorSerializer
    pagination_class = None

class RealtorView(RetrieveAPIView):
    queryset = Realtor.objects.all()
    serializer_class = RealtorSerializer

class RealtorUpdate(UpdateAPIView):
    queryset = Realtor.objects.all()
    serializer_class = RealtorSerializer

class IsVerifiedView(ListAPIView):
    permission_classes = (permissions.AllowAny, )
    queryset = Realtor.objects.filter(is_verified=True)
    serializer_class = RealtorSerializer
    pagination_class = None
    
class UpdateVerifiedView(UpdateAPIView):
    permission_classes = (permissions.AllowAny, )
    queryset = Realtor.objects.filter(is_verified=True)
    serializer_class = RealtorSerializer
    pagination_class = None