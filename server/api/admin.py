from django.contrib import admin
from api.models import *


class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'first_name', 'last_name', 'is_tutor', 'is_student')

admin.site.register(User, UserAdmin)

class TagAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'created_at')

admin.site.register(Tag, TagAdmin)

class TicketAdmin(admin.ModelAdmin):
    list_display = ('id', 'author', 'title', 'tags_string')

admin.site.register(Ticket, TicketAdmin)
