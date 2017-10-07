from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name="explorers_index"),
    url(r'^image$', views.image, name="explorers_image"),
]
