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


class MultipartM2MField(serializers.Field):
    def to_representation(self, obj):
        print(obj.values_list('id', flat=True))
        return obj.values_list('id', flat=True).order_by('id')
    
    def to_internal_value(self, data):
        return data.split(',') if data else None

class TicketSerializer(serializers.ModelSerializer):
    author = UserSerializer()
    tags = TagSerializer()
    liked_by = MultipartM2MField()

    class Meta:
        model = Ticket
        fields = '__all__'