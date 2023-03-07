from rest_framework import serializers
from rtchat.models import Chat, Message


class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.StringRelatedField()

    class Meta:
        model = Message
        fields = ('id', 'sender', 'content', 'timestamp')


class ChatSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(many=True, read_only=True)
    participants = serializers.StringRelatedField(many=True)

    class Meta:
        model = Chat
        fields = ('id', 'participants', 'created_at', 'messages')
