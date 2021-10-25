from django.contrib.sitemaps import Sitemap
from django.urls import reverse
from blog.models import BlogEntry

class ProjectsSitemap(Sitemap):
    changefreq = "daily"
    priority = 0.5

    def items(self):
        return BlogEntry.objects.filter(draft=False).order_by('-date')
    
    def lastmod(self, obj):
        return obj.date
    
    def location(self, obj):
        return reverse('blog_detail', kwargs={'pk': obj.id})
