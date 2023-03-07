from rtchat.models import Chat, Message
from .serializers import MessageSerializer, ChatSerializer
from rest_framework import generics


class ChatList(generics.ListAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer


class MessageList(generics.ListAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
