from django.db import models


# Create your models here.

class User(models.Model):
    uid = models.CharField(max_length=50)
    uname = models.CharField(max_length=20)
    password = models.CharField(max_length=20)

class Track(models.Model):
    uuid = models.CharField(max_length=50, primary_key=True)
    name = models.CharField(max_length=20)
    date = models.DateTimeField()
    password = models.CharField(max_length=50,default='123456')

class TrackPoint(models.Model):
    uuid = models.CharField(max_length=50, primary_key=True)

    latitude = models.FloatField(max_length=50)
    longitude = models.FloatField(max_length=50)
    accurary = models.FloatField(max_length=50)
    date = models.DateTimeField()
    satellite_num = models.IntegerField()
    loc_type = models.IntegerField()
    alt = models.FloatField(max_length=50)
    speed = models.FloatField(max_length=50)

    tk = models.ForeignKey(Track,on_delete="CASCADE")
