# Generated by Django 3.1.2 on 2022-06-29 14:51

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0004_auto_20220629_2224'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='time',
            field=models.CharField(default=datetime.datetime(2022, 6, 29, 14, 51, 43, 374909, tzinfo=utc), max_length=40),
            preserve_default=False,
        ),
    ]
