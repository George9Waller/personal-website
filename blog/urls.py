from django.urls import path

from blog.views import BlogDetailView, BlogListView


urlpatterns = [
    path('', BlogListView.as_view(), name="blog_list"),
    path('<int:pk>/', BlogDetailView.as_view(), name="blog_detail"),
]
