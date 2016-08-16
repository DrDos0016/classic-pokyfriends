from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name="blog"),
    url(r'^archive/$', views.archive, name="archive"),
    url(r'^(?P<id>[0-9]+.*)/(.*)$', views.index, name="entry"),
    url(r'^next/(?P<id>[0-9]+.*)$', views.navigate, {"dir":"next"}, name="next"),
    url(r'^prev/(?P<id>[0-9]+.*)$', views.navigate, {"dir":"prev"}, name="prev"),
    url(r'^preview$', views.preview, name="preview"),
    url(r'^tagged$', views.tagged, name="tag_list"),
    url(r'^tagged/(?P<slug>.*)$', views.tagged, name="tagged"),
]