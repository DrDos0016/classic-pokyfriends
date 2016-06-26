from django.http import HttpResponse, HttpResponseRedirect, Http404
from django.shortcuts import render, redirect, get_object_or_404
#from django.db.models import Count, Avg, Sum
#from django.db.models import Q, F
from pokyfriends.settings import BASE_DIR
from random import randint
from django.template.defaultfilters import slugify

from pokyfriends_web.models import *
from blog.models import *

import os

ROOT        = BASE_DIR
ENV         = "DEV" if os.path.isfile("/var/projects/DEV") else "PROD"

ADS         = True if ENV == "PROD" else False                  # Adsense
TRACKING    = True if ENV == "PROD" else False                  # Analytics
PROTOCOL    = "https://" if ENV == "PROD" else "http://"        # Http/Https