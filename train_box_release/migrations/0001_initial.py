# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Answer',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('pokemon', models.IntegerField(db_index=True)),
                ('option', models.CharField(max_length=7)),
                ('trio', models.CharField(max_length=11, db_index=True)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('ip', models.GenericIPAddressField()),
            ],
        ),
    ]
