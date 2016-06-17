from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name="pokemon-size-quiz"),
    url(r'^compare/(?P<code>[0-9A-F]{3}-[0-9A-F]{3}-[0-9A-F]{3})/(?P<code2>[0-9A-F]{3}-[0-9A-F]{3}-[0-9A-F]{3})$', views.compare, name="psq_compare"),
    url(r'^results/(?P<code>[0-9A-F]{3}-[0-9A-F]{3}-[0-9A-F]{3})$', views.results, name="psq_results"),
    url(r'^submit$', views.submit, name="psq_submit"),
    
    #url(r'^compare/(?P<code>[0-9A-F]{3}-[0-9A-F]{3}-[0-9A-F]{3})/(?P<code2>[0-9A-F]{3}-[0-9A-F]{3}-[0-9A-F]{3})$', 'pokemon_size_quiz.views.compare'),
    #url(r'^results/(?P<code>[0-9A-F]{3}-[0-9A-F]{3}-[0-9A-F]{3})$', 'pokemon_size_quiz.views.results'),
]