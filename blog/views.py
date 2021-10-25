from django.db.models import F
from django.http.response import Http404
from django.views.generic import DetailView
from django.views.generic.list import ListView

from blog.models import BlogCategory, BlogEntry

def get_category(request):
        category = request.GET.get('category', '')
        if category != '':
            cat_obj_set = BlogCategory.objects.filter(title=category)
            if cat_obj_set:
                return cat_obj_set[0]
        return ''


# Create your views here.
class BlogListView(ListView):
    paginate_by = 9
    model = BlogEntry

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        cat = get_category(self.request)
        context["categories"] = BlogCategory.objects.all()
        cat_text =  'All'
        if cat != '':
            cat_text = cat.title
        context["selected_category"] = cat_text
        return context
    
    def get_queryset(self):
        cat = get_category(self.request)
        if cat != '':
            queryset = BlogEntry.objects.filter(draft=False).filter(blogcategory=cat).annotate(category_title=F('blogcategory__title')).annotate(category_color=F('blogcategory__color_hex')).order_by('-date')
        else:
            queryset = BlogEntry.objects.filter(draft=False).annotate(category_title=F('blogcategory__title')).annotate(category_color=F('blogcategory__color_hex')).order_by('-date')

        if len(queryset) == 0:
            queryset = BlogEntry.objects.filter(draft=False).annotate(category_title=F('blogcategory__title')).annotate(category_color=F('blogcategory__color_hex')).order_by('-date')
        return queryset

            

class BlogDetailView(DetailView):
    model = BlogEntry

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["back_category"] = str(self.request.GET.get('back_category', '').split('#')[0])
        context["images"] = self.object.blogimage_set.all()
        return context

    def get_object(self):
        try:
            object = BlogEntry.objects.filter(draft=False).filter(id=self.kwargs.get('pk')).annotate(category=F('blogcategory__title')).annotate(category_color=F('blogcategory__color_hex'))[0]
            return object
        except:
            return Http404
