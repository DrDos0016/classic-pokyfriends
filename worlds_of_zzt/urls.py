from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name="woz_index"),
    url(r'^faq$', views.faq, name="woz_faq"),
]