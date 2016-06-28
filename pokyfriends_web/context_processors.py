from random import randint
from pokyfriends_web.common import ADS, PROTOCOL, ANALYTICS

def required(request):
    data = {}
    icon = request.GET.get("icon", randint(1,151))
    meowth = request.GET.get("meowth", randint(1,11))
    data["icon"] = ("00" + str(icon))[-3:]
    data["meowth"] = str(meowth)
    data["PROTOCOL"] = PROTOCOL
    
    data["ADS"] = ADS
    data["ANALYTICS"] = ANALYTICS
    if not ADS:
        data["ADS"] = request.GET.get("ads")
    return data