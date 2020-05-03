from django.shortcuts import render
from api.models import Ticket, Tag, Comment
from api.serializers import TicketSerializer, TagSerializer, CommentSerializer
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from twilio.rest import Client
import os
import json 

TWILIO_account_sid = os.environ.get("TWILIO_ACCOUNT_SID", "")
TWILIO_auth_token = os.environ.get("TWILIO_AUTH_TOKEN", "")
TWILIO_phone = os.environ.get("TWILIO_PHONE", "")

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response([request.user.id, request.user.avatar])

class TicketListView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

class TicketView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

class TicketViewTwilio(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, ticket_id):
        ticket = Ticket.objects.get(id=ticket_id)
        phone = ticket.author.phone
        ticket.claimed_by = request.user
        ticket.sms = request.data['sms']
        ticket.save()
        serialized_ticket = TicketSerializer(ticket)

        account_sid = TWILIO_account_sid
        auth_token  = TWILIO_auth_token

        client = Client(account_sid, auth_token)

        message = client.messages.create(
            to=f"+1{phone}", 
            from_=TWILIO_phone,
            body=ticket.sms)

        return Response(serialized_ticket.data)

class TagListView(generics.ListCreateAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

class TagView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

class CommentListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, ticket_id):
        ticket = Ticket.objects.get(id=ticket_id)
        comments = ticket.comments
        serialized_comments = CommentSerializer(comments, many=True)
        return Response(serialized_comments.data)
    
    def post(self, request, ticket_id):
        ticket = Ticket.objects.get(id=ticket_id)
        res = json.loads(request.body) 
        serialized_comment = CommentSerializer(data=res)
        if serialized_comment.is_valid():
            new_comment = serialized_comment.save()
            ticket.comments.add(new_comment)
            ticket.save()
            return Response(serialized_comment.data)
        else:
            return Response(serialized_comment.errors, status=status.HTTP_400_BAD_REQUEST)
    


class CommentView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer