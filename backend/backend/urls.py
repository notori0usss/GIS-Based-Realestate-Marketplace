"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from listings.api import views as listings_api_views
from realtors.api import views as realtors_api_views
from users.api import views as users_api_views
from rtchat.api import views as chats_api_views
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/listings/', listings_api_views.ListingList.as_view()),
    path('api/listings/create/', listings_api_views.ListingCreate.as_view()),
    path('api/listings/<int:pk>/', listings_api_views.ListingDetail.as_view()),
    path('api/listings/<int:pk>/delete/',
         listings_api_views.ListingDelete.as_view()),
    path('api/listings/<int:pk>/update/',
         listings_api_views.ListingUpdate.as_view()),

    path('api/bookings/', listings_api_views.BookingList.as_view()),
    path('api/bookings/<int:pk>/', listings_api_views.BookingDetail.as_view()),
    path('api/bookings/<int:pk>/update/',
         listings_api_views.BookingUpdateAPIView.as_view()),
    path('api/bookings/create/', listings_api_views.BookingCreate.as_view()),

    path('api/realtors/', realtors_api_views.RealtorList.as_view()),
    path('api/realtors/<int:pk>/', realtors_api_views.RealtorDetail.as_view()),
    path('api/realtors/create/', realtors_api_views.RealtorCreate.as_view()),
    path('api/realtors/verified/', realtors_api_views.IsVerifiedView.as_view()),
    path('api/realtors/<int:pk>/update/',
         realtors_api_views.RealtorUpdate.as_view()),
    path('api/realtors/<int:pk>/delete/',
         realtors_api_views.RealtorDelete.as_view()),

    path('api/profiles/', users_api_views.ProfileList.as_view()),
    path('api/profiles/<int:seller>/', users_api_views.ProfileDetail.as_view()),
    path('api/users/<int:pk>/', users_api_views.UserDetail.as_view()),

    path('api/profiles/<int:seller>/update/',
         users_api_views.ProfileUpdate.as_view()),

    path('api/chats/', chats_api_views.ChatRoomView.as_view()),
    path('api/users/<int:userId>/chats/',
         chats_api_views.ChatRoomView.as_view()),

    path('api/chats/<str:roomId>/messages/',
         chats_api_views.MessagesView.as_view()),

    path('api-auth-djoser/', include('djoser.urls')),
    path('api-auth-djoser/', include('djoser.urls.authtoken')),
    path('api/stripe/', include('payments.urls')),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
