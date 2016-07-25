from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name="st_index"),
    url(r'^ajax/load_url$', views.load_url, name="st_load_url"),
]