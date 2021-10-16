from django.contrib import admin

from cv.models import Cv, EventItem, Interest, Language, ListItem, Personality, SkillsLevel, ContactItem

# Register your models here.
class SkillsLevelInLine(admin.StackedInline):
    model = SkillsLevel


class InterestInLine(admin.StackedInline):
    model = Interest


class PersonalityInLine(admin.StackedInline):
    model = Personality


class LanguageInLine(admin.StackedInline):
    model = Language


class ListItemInLine(admin.StackedInline):
    model = ListItem


class ContactItemInLine(admin.StackedInline):
    model = ContactItem


class CvAdmin(admin.ModelAdmin):
    list_display = ['name', 'role']
    search_fields = ['name']

    inlines = [ContactItemInLine, SkillsLevelInLine, InterestInLine, PersonalityInLine, LanguageInLine]


class SkillsLevelAdmin(admin.ModelAdmin):
    inlines = [ListItemInLine]


admin.site.register(Cv, CvAdmin)

admin.site.register(SkillsLevel, SkillsLevelAdmin)
admin.site.register(Interest)
admin.site.register(Personality)
admin.site.register(Language)
admin.site.register(ListItem)
admin.site.register(EventItem)
admin.site.register(ContactItem)
