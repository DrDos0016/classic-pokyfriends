from django.contrib import admin

# Register your models here.
from .models import Poll, Vote, Option

admin.site.register(Poll)
admin.site.register(Option)
admin.site.register(Vote)