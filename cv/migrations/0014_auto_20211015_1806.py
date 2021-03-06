# Generated by Django 3.2.8 on 2021-10-15 18:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('cv', '0013_eventitem_cv'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cv',
            name='email',
        ),
        migrations.RemoveField(
            model_name='cv',
            name='github',
        ),
        migrations.RemoveField(
            model_name='cv',
            name='github_display_text',
        ),
        migrations.RemoveField(
            model_name='cv',
            name='linked_in',
        ),
        migrations.RemoveField(
            model_name='cv',
            name='linked_in_display_text',
        ),
        migrations.RemoveField(
            model_name='cv',
            name='location',
        ),
        migrations.RemoveField(
            model_name='cv',
            name='phone_number',
        ),
        migrations.RemoveField(
            model_name='cv',
            name='phone_number_no_spaces',
        ),
        migrations.CreateModel(
            name='ContactItem',
            fields=[
                ('listitem_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='cv.listitem')),
                ('cv', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cv.cv')),
            ],
            bases=('cv.listitem',),
        ),
    ]
