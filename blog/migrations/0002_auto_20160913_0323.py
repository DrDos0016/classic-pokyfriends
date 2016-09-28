# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-09-13 03:23
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='post',
            options={'ordering': ('-timestamp',)},
        ),
        migrations.AlterModelOptions(
            name='tag',
            options={'ordering': ('name',)},
        ),
        migrations.AddField(
            model_name='post',
            name='published',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='post',
            name='spotlight',
            field=models.BooleanField(default=True),
        ),
    ]
