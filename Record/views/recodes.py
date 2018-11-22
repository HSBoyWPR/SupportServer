import uuid
from datetime import time

import json

from django.core import serializers
from django.http import HttpResponse
from django.shortcuts import render
from Record import models


def home(request):
    # 查询所有轨迹
    track_list = models.Track.objects.all()
    track_default = track_list[0]
    trackPoint_default = models.TrackPoint.objects.filter(tk__uuid=track_default.uuid)

    return render(request, "home.html", locals())


def getPointsByTkID(req):
    tkID = req.GET.get('tk_id')
    result = {"status": 0, "data": [], "message": ""}
    if tkID:
        points = models.TrackPoint.objects.filter(tk__uuid=tkID).values("longitude","latitude")
        if len(points) > 0:
            result['status'] = 1
            result['data'] = list(points)
        else:
            result['message'] = "查询结果小于1"
    else:
        result['message'] = "tk_id不正确"

    return HttpResponse(json.dumps(result,ensure_ascii=False), content_type="application/json",charset="gbk")
