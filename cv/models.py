from django.db import models
from tinymce import models as tinymce_models


class Cv(models.Model):
    name = models.CharField(max_length=255)
    profile_picture = models.FileField(default=None, null=True)
    role = models.CharField(max_length=255)
    about = tinymce_models.HTMLField()

    def __str__(self) -> str:
        return self.name


class SkillsLevel(models.Model):
    cv = models.ForeignKey(Cv, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    ranking = models.IntegerField(default=1)

    class Meta:
        ordering = ['ranking']

    def __str__(self) -> str:
        return self.title


class ListItem(models.Model):
    title = models.CharField(max_length=255)
    ranking = models.IntegerField(default=1)
    description = tinymce_models.HTMLField(null=True, blank=True)
    link = models.CharField(max_length=255, null=True, blank=True)
    icon_html = models.CharField(max_length=1024, null=True, blank=True)
    skill_level = models.ForeignKey(SkillsLevel, null=True, blank=True, on_delete=models.CASCADE)

    class Meta:
        ordering = ['ranking', 'title']

    def __str__(self) -> str:
        return self.title

class EventItem(ListItem):
    location = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=512, blank=True, null=True)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    cv = models.ForeignKey(Cv, null=True, default=None, on_delete=models.CASCADE)


class Interest(ListItem):
    cv = models.ForeignKey(Cv, on_delete=models.CASCADE)


class Personality(ListItem):
    cv = models.ForeignKey(Cv, on_delete=models.CASCADE)


class Language(ListItem):
    cv = models.ForeignKey(Cv, on_delete=models.CASCADE)


class ContactItem(ListItem):
    cv = models.ForeignKey(Cv, on_delete=models.CASCADE)
