# Generated by Django 3.2.8 on 2021-10-16 13:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0004_blogcategory_cv_cateogry'),
    ]

    operations = [
        migrations.RenameField(
            model_name='blogcategory',
            old_name='cv_cateogry',
            new_name='cv_category',
        ),
    ]
