from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    is_tutor = models.BooleanField(default=False, null=False)
    is_student = models.BooleanField(default=True, null=False)
    grade = models.IntegerField(default=None, null=True, blank=True)

class Tag(models.Model):
    def __str__(self):
        return self.name
    name = models.CharField(max_length=64)
    created_at = models.DateTimeField(auto_now_add=True)


class Ticket(models.Model):
    title = models.CharField(max_length=256)
    author = models.ForeignKey(User, on_delete=models.PROTECT, related_name="ticket_author")
    tags = models.ManyToManyField(Tag, blank=True)
    description = models.TextField(default=None, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    last_updated_at = models.DateTimeField(auto_now=True)
    claimed_by = models.ForeignKey(User, default=None, blank=True, null=True, on_delete=models.PROTECT, related_name="ticket_claimed_by")
    resolved = models.BooleanField(default=False)

    def tags_string(self):
        ass_tags = self.tags.all()
        tag_string = ""
        for tag in ass_tags:
            tag_string += str(tag) + ', '
        return str(tag_string)