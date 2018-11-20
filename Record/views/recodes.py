from django.shortcuts import render
from Record import models

def home(request):
    # 查询所有轨迹
    track_list=models.Track.objects.all()



    return render(request, "home.html",locals())


def main(req):
    return render(req, "main.html");


def trackSearch(req):
    return render(req, "track.html")
