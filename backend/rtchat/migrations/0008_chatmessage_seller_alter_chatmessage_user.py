# Generated by Django 4.1.5 on 2023-03-08 18:01

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0014_alter_profile_facebook_link_and_more'),
        ('rtchat', '0007_alter_chatmessage_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='chatmessage',
            name='seller',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='chatmessage',
            name='user',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.SET_NULL, to='users.profile'),
        ),
    ]