# Generated by Django 3.0.5 on 2020-04-27 00:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_auto_20200426_1844'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='avatar',
            field=models.URLField(blank=True, null=True),
        ),
    ]
