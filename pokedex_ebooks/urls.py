from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name="pokedex-ebooks"),
    url(r'^comics$', views.comics, name="pe_comics"),
    url(r'^api/json$', views.to_json, name="pe_json"),
]