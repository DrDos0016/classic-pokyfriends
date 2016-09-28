from django.db import models
from django.template.defaultfilters import slugify

# Create your models here.    
class Tag(models.Model):
    name            = models.CharField(max_length=50)
    slug            = models.CharField(max_length=50, db_index=True, default="")
    
    class Meta:
        app_label = "blog"
        ordering = ("name",)
        
    def __str__(self):
        return self.name

class Post(models.Model):
    """ Blog post fields
        title -- Title of post
        author -- Author of post
        summary -- Summary used in <meta> tags
        content -- Body of post
        source -- Where the post originally appeared
        timestamp -- Date/Time the original post was created
        published -- If the post should appear on the site
        spotlight -- If the post should be allowed to be on the front page of the blog (this is only applicable to the latest dated post)
        tags -- List of tags to categorize the post with
    """
    title           = models.CharField(max_length=100)
    author          = models.CharField(max_length=20, default="Dr. Dos", db_index=True)
    summary         = models.CharField(max_length=150, default="An exciting article you should read")
    content         = models.TextField()
    source          = models.URLField(default="", blank=True)
    timestamp       = models.DateTimeField()
    published       = models.BooleanField(default=True)
    spotlight       = models.BooleanField(default=True)
    tags            = models.ManyToManyField("Tag")
    
    class Meta:
        app_label = "blog"
        ordering = ("-timestamp",)
        
    def __str__(self):
        return self.title