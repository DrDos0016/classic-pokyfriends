from django.db import models
from django.template.defaultfilters import slugify

# Create your models here.    
class Tag(models.Model):
    name            = models.CharField(max_length=50)
    slug            = models.CharField(max_length=50, db_index=True, default="")
    
    class Meta:
        app_label = "blog"
        ordering = "name"
        
    def __str__(self):
        return self.name

class Post(models.Model):
    title           = models.CharField(max_length=100)
    author          = models.CharField(max_length=20, default="Dr. Dos", db_index=True)
    summary         = models.CharField(max_length=150, default="An exciting article you should read")
    content         = models.TextField()
    source          = models.URLField(default="", blank=True)
    timestamp       = models.DateTimeField()
    tags            = models.ManyToManyField("Tag")
    
    class Meta:
        app_label = "blog"
        
    def __str__(self):
        return self.title