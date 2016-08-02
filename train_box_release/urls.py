from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name="tbr_index"),
    url(r'^custom$', views.custom, name="tbr_custom"),
    url(r'^ajax/submit$', views.submit, name="tbr_submit"),
    url(r'^(?P<poke1>[0-9]+)$', views.index, name="tbr_streak"),
    url(r'^(?P<poke1>[0-9]+)/(?P<poke2>[0-9]+)/(?P<poke3>[0-9]+)$', views.index, name="tbr_specific"),
    url(r'^(?P<poke1>[0-9]+)/(?P<poke2>[0-9]+)/(?P<poke3>[0-9]+)/results$', views.results, name="tbr_results"),
]