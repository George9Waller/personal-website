from django.db.models.expressions import F, ExpressionWrapper
from django.db.models.fields import BooleanField
from django.db.models.query_utils import Q
from django.views.generic import TemplateView
from django_user_agents.utils import get_user_agent
from cv.models import ContactItem, Cv, EventItem, Interest, Language, Personality, SkillsLevel
from blog.models import BlogCategory, BlogEntry


# Create your views here.
def get_skills_array(cv):
    skills_levels = SkillsLevel.objects.filter(cv=cv)
    skills_array = []
    for level in skills_levels:
        level_array = [level.title]
        skills = level.listitem_set.all().annotate(has_icon=ExpressionWrapper(
            Q(icon_html__isnull=False),
            output_field=BooleanField()
        )).order_by('-has_icon', 'ranking')

        for skill in skills:
            level_array.append(skill)
        skills_array.append(level_array)
    return skills_array

def get_is_touch(request):
    user_agent = get_user_agent(request)
    return (user_agent.is_mobile or user_agent.is_tablet) and user_agent.is_touch_capable


class HomepageView(TemplateView):
    template_name = 'templates/cv/homepage.html'

    def get_context_data(self, **kwargs):
        cv = Cv.objects.all().last()
        cv_category = BlogCategory.objects.filter(cv_category=True)[0]
        context = super().get_context_data(**kwargs)
        context["is_touch"] = get_is_touch(self.request)
        context["name"] = cv.name
        context["profile_picture"] = cv.profile_picture
        context["role"] = cv.role
        context["about"] = cv.about
        context["contact_items"] = ContactItem.objects.filter(cv=cv).order_by('ranking')
        context["languages"] = Language.objects.filter(cv=cv).order_by('ranking')
        context["personality"] = Personality.objects.filter(cv=cv).order_by('ranking')
        context["interests"] = Interest.objects.filter(cv=cv).order_by('ranking')
        context["skills_array"] = get_skills_array(cv)
        context["events"] = EventItem.objects.filter(cv=cv).order_by('-start_date')
        context['cv_projects'] = BlogEntry.objects.filter(blogcategory=cv_category).annotate(category_title=F('blogcategory__title')).annotate(category_color=F('blogcategory__color_hex')).order_by('-date')[:3]
        return context
    
