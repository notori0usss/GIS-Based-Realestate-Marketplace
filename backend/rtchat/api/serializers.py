from rest_framework import serializers
from rtchat.models import ChatRoom, ChatMessage
from users.api.serializers import ProfileSerializer


class ChatRoomSerializer(serializers.ModelSerializer):
    member = ProfileSerializer(many=True, read_only=True)
    members = serializers.ListField(write_only=True)

    def create(self, validatedData):
        memberObject = validatedData.pop('members')
        chatRoom = ChatRoom.objects.create(**validatedData)
        chatRoom.member.set(memberObject)
        return chatRoom

    class Meta:
        model = ChatRoom
        exclude = ['id']


class ChatMessageSerializer(serializers.ModelSerializer):
    userName = serializers.SerializerMethodField()
    userImage = serializers.SerializerMethodField()
    profile_id = serializers.SerializerMethodField()

    class Meta:
        model = ChatMessage
        exclude = ['id', 'chat']

    def get_profile_id(self, Obj):
        return Obj.user.seller.id

    def get_userName(self, Obj):
        return Obj.user.f_name + ' ' + Obj.user.l_name

    def get_userImage(self, obj):
        try:
            return obj.user.profile_picture.url
        except AttributeError as e:
            print("Attr Error", e)
            return None
