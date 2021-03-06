# Generated by Django 3.2.8 on 2021-10-25 17:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0006_auto_20211018_1131'),
    ]

    operations = [
        migrations.CreateModel(
            name='BlogImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
                ('image', models.FileField(upload_to='')),
                ('blog', models.ManyToManyField(to='blog.BlogEntry')),
            ],
        ),
    ]
