from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Poll(models.Model):
    start_date  = models.DateField()
    end_date    = models.DateField()
    secret      = models.CharField(max_length=32)
    option1      = models.ForeignKey("Option", related_name='option1')
    option2      = models.ForeignKey("Option", related_name='option2')
    option3      = models.ForeignKey("Option", related_name='option3')
    option4      = models.ForeignKey("Option", related_name='option4')
    option5      = models.ForeignKey("Option", related_name='option5')
    
    def __str__(self):
        return "Poll " +str(self.start_date) + " through " + str(self.end_date)
        
class Vote(models.Model):
    poll        = models.ForeignKey("Poll")
    ip          = models.GenericIPAddressField(default="")
    timestamp   = models.DateTimeField(auto_now_add=True)
    email       = models.EmailField()
    option      = models.ForeignKey("Option")
    
class Option(models.Model):
    name        = models.CharField(max_length=80)
    image       = models.CharField(max_length=30)
    author      = models.CharField(max_length=80)
    released    = models.DateField()
    summary     = models.CharField(max_length=300)
    
    def __str__(self):
        return self.name + " by " + self.author