from django.db import models
from django.db.models.fields import BooleanField
from martor.models import MartorField

blog_categories = (
    ('CODING', 'Coding'),
    ('PHOTOGRAPHY', 'Photography'),

)

# Create your models here.
class BlogEntry(models.Model):
    date = models.DateField()
    title = models.CharField(max_length=255)
    short_description = models.CharField(max_length=512)
    cover_image = models.FileField()
    content = MartorField()
    draft = BooleanField(default=False)

    class Meta:
        ordering = ['-date']
    
    def __str__(self) -> str:
        return f'{self.title} [{self.date}] | {self.short_description}'


class BlogCategory(models.Model):
    title = models.CharField(max_length=30)
    color_hex = models.CharField(max_length=7)
    ranking = models.IntegerField(default=1)
    blog = models.ManyToManyField(BlogEntry)
    cv_category = models.BooleanField(default=False)

    class Meta:
        ordering = ['ranking']
    
    def __str__(self) -> str:
        return f'{self.title} | {self.color_hex}'


class BlogImage(models.Model):
    title = models.CharField(max_length=50)
    image = models.FileField()
    blog = models.ManyToManyField(BlogEntry)

    class Meta:
        ordering = ['title']

    def __str__(self) -> str:
        return f'{self.title} | {self.blog}'
