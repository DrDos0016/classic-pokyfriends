from pokyfriends_web.common import *

# Create your views here.

def index(request):
    data = {"blocks":["about"]}
    return render(request, "index.html", data)