from django.db import models

class Product(models.Model):
    
    name = models.CharField(max_length=200)
    text = models.CharField(max_length=500)
    time = models.CharField(max_length=40)

    def __str__(self):
        return self.name