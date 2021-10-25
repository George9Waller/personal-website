from django.contrib.admin.options import StackedInline
from django.db import models
from django.contrib import admin

from martor.widgets import AdminMartorWidget

from blog.models import BlogCategory, BlogEntry, BlogImage

# Register your models here.
class BlogEntryAdmin(admin.ModelAdmin):
    list_display = ['title', 'date']

    formfield_overrides = {
        models.TextField: {'widget': AdminMartorWidget}
    }

    class Media:
        js = ('js/jquery-3.6.0.min.js', 'plugins/js/semantic.min.js')
        css = {
            'all': ('plugins/css/ace.min.css', 'plugins/css/resizable.min.css', 'martor/css/martor.bootstrap.min.css', 'plugins/css/semantic.min.css')
        }



admin.site.register(BlogEntry, BlogEntryAdmin)
admin.site.register(BlogCategory)
admin.site.register(BlogImage)
