# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from pokyfriends_web.common import *

# Create your views here.

def index(request):
    data = {"blocks":["about"]}
    return render(request, "index.html", data)
    
def pokemon_type_chart_quiz(request):
    data = {"blocks":[], "title":"Pokémon Type Chart Quiz"}
    return render(request, "pokemon_type_chart_quiz.html", data)