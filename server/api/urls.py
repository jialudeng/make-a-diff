"""server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
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
from rest_framework.authtoken.views import obtain_auth_token
import api.views as api_views

urlpatterns = [
    path('v1/auth/token/', obtain_auth_token, name='api_token_auth'),
    path('v1/user/', api_views.UserProfileView.as_view(), name='user_profile_data'),
    path('v1/tickets/<int:pk>/', api_views.TicketView.as_view()),
    path('v2/tickets/<int:ticket_id>/', api_views.TicketViewTwilio.as_view()),
    path('v1/tickets/', api_views.TicketListView.as_view()),
    path('v1/tags/<int:pk>/', api_views.TagView.as_view()),
    path('v1/tags/', api_views.TagListView.as_view()),
    path('v1/tickets/<int:ticket_id>/comments/', api_views.CommentListView. as_view()),
    path('v1/tickets/<int:ticket_id>/comments/<int:pk>/', api_views.CommentView. as_view())
]
