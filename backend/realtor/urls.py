from django.urls import path
from .views import RealtorListView, RealtorView, IsVerifiedView

urlpatterns = [
    path('', RealtorListView.as_view()),
    path('verified', IsVerifiedView.as_view()),
    path('<pk>', RealtorView.as_view()),
]