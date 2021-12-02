from django.db import models

# Create your models here.


class Restaurant(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    ratings = models.IntegerField()
    personalList = models.BooleanField(default=False)
