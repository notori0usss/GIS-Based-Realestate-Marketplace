from rest_framework import serializers
from realtors.models import Realtors


class RealtorSerializer(serializers.ModelSerializer):
    profile_picture = serializers.SerializerMethodField()

    def get_profile_picture(self, obj):
        try:
            return obj.user.profile.profile_picture.url
        except AttributeError as e:
            print("Attr Error", e)
            return None

    class Meta:
        model = Realtors
        fields = '__all__'
