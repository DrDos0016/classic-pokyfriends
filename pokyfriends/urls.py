"""pokyfriends URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import include, url
from django.contrib import admin
import pokyfriends_web.views


urlpatterns = [
    url(r"^$", pokyfriends_web.views.index, name="index"),
    url(r"^admin/", admin.site.urls),
    url(r"^blog/", include("blog.urls")),
    url(r"^pokedex-ebooks/", include("pokedex_ebooks.urls")),
    url(r"^pokemon-size-quiz/", include("pokemon_size_quiz.urls")),
    url(r"^train-box-release/", include("train_box_release.urls")),
    url(r"^stitchr/", include("stitchr.urls")),
    url(r"^pokemon-type-chart-quiz$", pokyfriends_web.views.pokemon_type_chart_quiz, name="pokemon_type_chart_quiz"),
    url(r"^worlds-of-zzt/", include("worlds_of_zzt.urls")),
]
