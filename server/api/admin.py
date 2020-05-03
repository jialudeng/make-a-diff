from django.contrib import admin
from api.models import *


class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'first_name', 'last_name', 'is_tutor', 'is_student')

admin.site.register(User, UserAdmin)

class TagAdmin(admin.ModelAdmin):
    list_display = ('id', 'label')

admin.site.register(Tag, TagAdmin)

class CommentAdmin(admin.ModelAdmin):
    list_display = ('id', 'content', 'author', 'created_at')


admin.site.register(Comment, CommentAdmin)

class TicketAdmin(admin.ModelAdmin):
    list_display = ('id', 'author', 'title', 'tags_string')

admin.site.register(Ticket, TicketAdmin)
