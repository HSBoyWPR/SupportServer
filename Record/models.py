from django.db import models


# Create your models here.

class User(models.Model):
    uid = models.CharField(max_length=50)
    uname = models.CharField(max_length=20)
    password = models.CharField(max_length=20)

# class Track:
#     uuid = models.CharField(max_length=50, primary_key=True)
#     name = models.CharField(max_length=20)
#     date = models.DateField()
#     password = models.CharField(max_length=50)
#
#
# class TrackPoint:
#     uuid = models.CharField(max_length=50, primary_key=True)
