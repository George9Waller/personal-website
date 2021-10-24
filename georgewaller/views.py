from django.db.models import F
from django.views.generic import TemplateView
from blog.models import BlogEntry


class HomeView(TemplateView):
    template_name = "homepage.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['recent_projects'] = BlogEntry.objects.all().annotate(category_title=F('blogcategory__title')).annotate(category_color=F('blogcategory__color_hex')).order_by('-date')[:3]
        return context
