from django.db import models

# Create your models here.
class Answer(models.Model):
    pokemon         = models.IntegerField(db_index=True)
    option          = models.CharField(max_length=7)
    trio            = models.CharField(max_length=11, db_index=True)
    timestamp       = models.DateTimeField(auto_now_add=True)
    ip              = models.GenericIPAddressField()
    
    @property
    def images(self):
        triplet = self.trio.split("/")
        output = ""
        for x in xrange(0,3):
            output += '<img src="/static/train_box_release/icons/'+triplet[x]+'.png" alt="'+triplet[x]+'">'
        return output