# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render

# Create your views here.
def faq(request):
    data = {"title":"FAQ - Worlds of ZZT"}
    return render(request, "worlds_of_zzt/faq.html", data)

def index(request):
    data = {"title":"Worlds of ZZT"}
    return render(request, "worlds_of_zzt/index.html", data)