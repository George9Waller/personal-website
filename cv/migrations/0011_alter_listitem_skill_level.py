# Generated by Django 3.2.8 on 2021-10-15 14:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('cv', '0010_cv_phone_number_no_spaces'),
    ]

    operations = [
        migrations.AlterField(
            model_name='listitem',
            name='skill_level',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='cv.skillslevel'),
        ),
    ]
