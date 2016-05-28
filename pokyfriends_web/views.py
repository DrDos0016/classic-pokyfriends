from django.shortcuts import render
from pokyfriends_web.common import *

# Create your views here.

def index(request):
    data = {}
    return render(request, "index.html", data)