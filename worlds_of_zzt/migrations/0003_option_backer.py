# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-09-25 02:08
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('worlds_of_zzt', '0002_vote_email'),
    ]

    operations = [
        migrations.AddField(
            model_name='option',
            name='backer',
            field=models.BooleanField(default=False),
        ),
    ]
