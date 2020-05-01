from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    is_tutor = models.BooleanField(default=False, null=False)
    is_student = models.BooleanField(default=True, null=False)
    avatar = models.URLField(null=True, blank=True)
    grade = models.IntegerField(default=None, null=True, blank=True)
    phone = models.IntegerField(default=None, null=True, blank=True)

class Tag(models.Model):
    def __str__(self):
        return self.name
    name = models.CharField(max_length=64)
    created_at = models.DateTimeField(auto_now_add=True)

class Comment(models.Model):
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.PROTECT, related_name="comment_author")
    created_at = models.DateTimeField(auto_now_add=True)
    last_updated_at = models.DateTimeField(auto_now=True)

class Ticket(models.Model):
    title = models.CharField(max_length=256)
    author = models.ForeignKey(User, on_delete=models.PROTECT, related_name="ticket_author")
    tags = models.ManyToManyField(Tag, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    last_updated_at = models.DateTimeField(auto_now=True)
    claimed_by = models.ForeignKey(User, default=None, blank=True, null=True, on_delete=models.PROTECT, related_name="ticket_claimed_by")
    resolved = models.BooleanField(default=False)
    liked_by = models.ManyToManyField(User, blank=True)
    comments = models.ManyToManyField(Comment, blank=True)
    sms = models.TextField(default=None, blank=True, null=True)

    def tags_string(self):
        ass_tags = self.tags.all()
        tag_string = ""
        for tag in ass_tags:
            tag_string += str(tag) + ', '
        return str(tag_string)

