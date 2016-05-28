# -*- coding: utf-8 -*-
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import redirect, get_object_or_404
#from django.db.models import Count, Avg, Sum
#from django.db.models import Q, F
from pokyfriends.settings import BASE_DIR

ADS         = True                  #Adsense
TRACKING    = True                  #Analytics
ROOT        = BASE_DIR
ENV         = "DEV"
