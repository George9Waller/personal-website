# Generated by Django 3.2.8 on 2021-10-13 10:23

from django.db import migrations, models
import django.db.models.deletion
import tinymce.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ListItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('description', tinymce.models.HTMLField(null=True)),
                ('link', models.CharField(max_length=255, null=True)),
                ('icon_html', models.CharField(max_length=1024, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='EventItem',
            fields=[
                ('listitem_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='cv.listitem')),
                ('location', models.CharField(max_length=255)),
                ('subtitle', models.CharField(max_length=512)),
                ('start_date', models.DateField(null=True)),
                ('end_date', models.DateField(null=True)),
            ],
            bases=('cv.listitem',),
        ),
        migrations.CreateModel(
            name='SkillsLevel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('skills', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cv.listitem')),
            ],
        ),
        migrations.CreateModel(
            name='Cv',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('role', models.CharField(max_length=255)),
                ('location', models.CharField(max_length=255)),
                ('phone_number', models.CharField(max_length=25)),
                ('email', models.EmailField(max_length=254)),
                ('github', models.CharField(max_length=255)),
                ('linked_in', models.CharField(max_length=255)),
                ('about', tinymce.models.HTMLField()),
                ('interests', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cv_interests', to='cv.listitem')),
                ('languages', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cs_languages', to='cv.listitem')),
                ('personality', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cv_personality', to='cv.listitem')),
                ('skills_levels', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cv_skills_levels', to='cv.skillslevel')),
            ],
        ),
    ]
