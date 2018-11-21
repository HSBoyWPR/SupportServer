import uuid
from datetime import time

from django.shortcuts import render
from Record import models

def home(request):
    # 查询所有轨迹
    track_list= models.Track.objects.all()
    track_default= track_list[0]
    trackPoint_default= models.TrackPoint.objects.filter(tk__uuid=track_default.uuid)

    return render(request, "home.html",locals ())


def main(req):
    return render(req, "main.html")


def trackSearch(req):
    return render(req, "track.html")

def addPoint(req):
   o= models.Track.objects.create(uuid=uuid.uuid1(),name='test',date=time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()))
   o.save()