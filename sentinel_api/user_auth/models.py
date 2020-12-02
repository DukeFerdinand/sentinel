from django.db import models

# Create your models here.
class User(models.Model):
    date_created = models.DateTimeField('date created')
    date_updated = models.DateTimeField('date updated')

    username = models.CharField(max_length=30)
    password = models.CharField(max_length=20)
    first_name = models.CharField(max_length=25)
    last_name = models.CharField(max_length=25)

