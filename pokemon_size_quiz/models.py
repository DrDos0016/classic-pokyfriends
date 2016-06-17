from django.db import models

# Create your models here.

class Guess(models.Model):
    guess       = models.DecimalField(default=0, max_digits=5, decimal_places=1)
    pokemon     = models.IntegerField(default=0)
    mode        = models.CharField(max_length=8, default="imperial")    
    quiz_code   = models.CharField(max_length=11, default="000-000-000")
    name        = models.CharField(max_length=12, default="Anonymous")
    ip          = models.GenericIPAddressField(default="")
    timestamp   = models.DateTimeField(auto_now_add=True)
    
    def get_pokemon(self):
        return str(self.pokemon)