from django.shortcuts import render
from api.models import Ticket, Tag, Comment
from api.serializers import TicketSerializer, TagSerializer, CommentSerializer
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication

class UserProfileView(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(request.user.id)

class TicketListView(generics.ListCreateAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

class TicketView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]
    
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

class TicketViewTwilio(APIView):
    def post(self, request, ticket_id):
        


class TagListView(generics.ListCreateAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

class TagView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

class CommentListView(APIView):
    def get(self, request, ticket_id):
        ticket = Ticket.objects.get(id=ticket_id)
        comments = ticket.comments
        serialized_comments = CommentSerializer(comments, many=True)
        return Response(serialized_comments.data)


class CommentView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer