"""
WSGI config for pokyfriends project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.9/howto/deployment/wsgi/
"""

import os, sys, site

site.addsitedir('/var/projects/xpokyfriends/venv/lib/python3.5/site-packages')
sys.path.append("/var/projects/xpokyfriends")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "pokyfriends.settings")
print("VERSION", sys.version)
from django.core.wsgi import get_wsgi_application

application = get_wsgi_application()