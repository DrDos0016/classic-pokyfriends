# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-08-13 19:10
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Guess',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('guess', models.DecimalField(decimal_places=1, default=0, max_digits=5)),
                ('pokemon', models.IntegerField(default=0)),
                ('mode', models.CharField(default=b'imperial', max_length=8)),
                ('quiz_code', models.CharField(default=b'000-000-000', max_length=11)),
                ('name', models.CharField(default=b'Anonymous', max_length=12)),
                ('ip', models.GenericIPAddressField(default=b'')),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
