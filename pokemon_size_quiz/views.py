from django.shortcuts import render, redirect
import json, random
from .models import Guess

# Create your views here.

def compare(request, code, code2):
    if code == "" or code2 == "":
        return redirect("pokemon-size-quiz")
    data = {"title":"Compare - Pokémon Size Quiz"}
    
    data["quiz_code"] = code
    data["quiz_code2"] = code2
    p1guesses = Guess.objects.filter(quiz_code=code).order_by("id")
    p2guesses = Guess.objects.filter(quiz_code=code2).order_by("id")
    
    data["guesses"] = []
    
    if len(p1guesses) != len(p2guesses):
        return redirect("pokemon-size-quiz")
    
    for x in range(0, len(p1guesses)):
        if p1guesses[x].pokemon != p2guesses[x].pokemon:
            return redirect("pokemon-size-quiz")
        data["guesses"].append({"p1guess":p1guesses[x].guess, "p2guess":p2guesses[x].guess, "pokemon":str(p1guesses[x].pokemon)})

    data["p1name"] = p1guesses[0].name
    data["p2name"] = p2guesses[0].name
    return render(request, "pokemon_size_quiz/compare.html", data)

def index(request, code=""):
    data = {"title":"Pokémon Size Quiz"}
    if code != "":
        data["challenge"] = code
        data["name"] = "Anonymous"
        data["order"] = ""
        pokemon = Guess.objects.filter(quiz_code=code)
        for pkmn in pokemon:
            data["order"]+= str(int(pkmn.pokemon))+","
        data["order"] = data["order"][:-1]
        if pokemon[0] and pokemon[0].name:
            data["name"] = pokemon[0].name
    else:
        data["challenge"] = ""
        
    if request.GET.get("debug"):
        data["debug"] = True
    return render(request, "pokemon_size_quiz/index.html", data)

def results(request, code):
    data = {"title":"Results - Pokémon Size Quiz"}
    data["quiz_code"] = code
    data["guesses"] = Guess.objects.filter(quiz_code=code).order_by("id")
    if request.GET.get("metric") or data["guesses"][0].mode == "metric":
        data["mode"] = "metric"
    else:
        data["mode"] = "imperial"
    
    return render(request, "pokemon_size_quiz/results.html", data)
    
def submit(request):
    if not request.POST.get("data"):
        return redirect("pokemon-size-quiz")
    data = {}
    
    json_data = json.loads(request.POST["data"])

    keys = "0123456789ABCDEF"
    while True:
        code = keys[random.randint(0,15)] + keys[random.randint(0,15)] + keys[random.randint(0,15)] + "-" + keys[random.randint(0,15)] + keys[random.randint(0,15)] + keys[random.randint(0,15)] + "-" + keys[random.randint(0,15)] + keys[random.randint(0,15)] + keys[random.randint(0,15)]
        if not Guess.objects.filter(quiz_code=code).exists():
            break
    
    guesses = []
    ip = request.META["REMOTE_ADDR"]
    name = request.POST.get("name", "Anonymous")
    for entry in json_data:
        guess = entry["guess"]
        pokemon = entry["pokemon"]
        mode = request.POST.get("mode", "imperial")
        guesses.append(Guess(guess=guess, pokemon=pokemon, mode=mode, quiz_code=code, name=name, ip=ip))
    
    Guess.objects.bulk_create(guesses)
    
    if request.POST.get("challenge") != "":
        return redirect("/pokemon-size-quiz/compare/"+request.POST.get("challenge")+"/"+code)
    return redirect("psq_results", code=code)