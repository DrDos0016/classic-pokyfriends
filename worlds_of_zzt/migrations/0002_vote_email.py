# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-08-13 19:10
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('worlds_of_zzt', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='vote',
            name='email',
            field=models.EmailField(default='', max_length=254),
            preserve_default=False,
        ),
    ]
