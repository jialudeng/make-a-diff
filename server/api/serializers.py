from rest_framework import serializers
from api.models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ['password']

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class TicketSerializer(serializers.ModelSerializer):
    author = UserSerializer()
    tags = TagSerializer()
    class Meta:
        model = Ticket
        fields = '__all__'