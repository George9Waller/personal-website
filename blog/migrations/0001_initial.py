# Generated by Django 3.2.8 on 2021-10-16 11:52

from django.db import migrations, models
import martor.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='BlogEntry',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('title', models.CharField(max_length=255)),
                ('short_description', models.CharField(max_length=512)),
                ('cover_image', models.FileField(upload_to='')),
                ('content', martor.models.MartorField()),
            ],
        ),
    ]
