from django.shortcuts import render


def home(request):
    return render(request, "home.html")


def main(req):
    return render(req, "main.html");


def trackSearch(req):
    return render(req, "track.html")
