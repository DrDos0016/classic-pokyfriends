from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name="woz_index"),
    url(r'^faq$', views.faq, name="woz_faq"),
    url(r'^poll$', views.poll, name="woz_poll"),
    url(r'^poll/(?P<id>[0-9]+)/results$', views.results, name="woz_results"),
]