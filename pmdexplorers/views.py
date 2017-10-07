from django.http import Http404, HttpResponse
from django.shortcuts import render

import os
import subprocess

# Create your views here.

def index(request):
    data = {}

    if request.POST.get("action") == "Submit":
        print("SUBMITTED")
        data["time"] = request.POST.get("time", "time").lower()
        data["darkness"] = request.POST.get("darkness", "darkness").lower()

        if data["time"] == "":
            data["time"] = "---"
        if data["darkness"] == "":
            data["darkness"] = "---"

        filename = data["darkness"].replace(" ", "_") + "-" + data["time"].replace(" ", "_") + ".png"

        if not os.path.isfile("/var/projects/pokyfriends/pmdexplorers/static/pmdexplorers/output/" + filename):
            resp = subprocess.run(["/var/projects/ebooks/venv/bin/python3", "/var/projects/pokyfriends/pmdexplorers/generator.py", data["darkness"], data["time"]])

        if os.path.isfile("/var/projects/pokyfriends/pmdexplorers/static/pmdexplorers/output/" + filename):
            data["filename"] = filename
        else:
            print("No such file")

        if data["time"] == "---":
            data["time"] = ""
        if data["darkness"] == "---":
            data["darkness"] = ""

    return render(request, "pmdexplorers/index.html", data)

def image(request):
    data = {}
    # Returns nothing but an image based on passed GET parameters
    data["time"] = request.GET.get("time", "").lower()
    data["darkness"] = request.GET.get("darkness", "").lower()

    if data["time"] == "" and data["darkness"] == "":
        raise(Http404)

    if data["time"] == "":
        data["time"] = "---"
    if data["darkness"] == "":
        data["darkness"] = "---"

    filename = data["darkness"].replace(" ", "_") + "-" + data["time"].replace(" ", "_") + ".png"

    if not os.path.isfile("/var/projects/pokyfriends/pmdexplorers/static/pmdexplorers/output/" + filename):
        resp = subprocess.run(["/var/projects/ebooks/venv/bin/python3", "/var/projects/pokyfriends/pmdexplorers/generator.py", data["darkness"], data["time"]])

    if os.path.isfile("/var/projects/pokyfriends/pmdexplorers/static/pmdexplorers/output/" + filename):
        with open("/var/projects/pokyfriends/pmdexplorers/static/pmdexplorers/output/" + filename, "rb") as fh:
            content = fh.read()
            resp = HttpResponse(content)
            resp["Content-Type"] = "image/png"
        return resp
    else:
        raise(Http404)

