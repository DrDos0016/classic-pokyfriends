# -*- coding: utf-8 -*-
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect, get_object_or_404
#from django.db.models import Count, Avg, Sum
#from django.db.models import Q, F
from pokyfriends.settings import BASE_DIR
from random import randint

from pokyfriends_web.models import *
from blog.models import *

ADS         = False                  #Adsense
TRACKING    = False                  #Analytics
ROOT        = BASE_DIR
ENV         = "DEV"
