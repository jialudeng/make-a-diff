# Generated by Django 3.0.5 on 2020-04-29 04:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_auto_20200427_2131'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='phone',
            field=models.IntegerField(blank=True, default=None, max_length=10, null=True),
        ),
    ]