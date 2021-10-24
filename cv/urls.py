from django.urls import path

from cv.views import HomepageView

urlpatterns = [
    path('', HomepageView.as_view(), name="cv"),
]
