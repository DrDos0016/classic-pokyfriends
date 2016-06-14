from django.shortcuts import render

# Create your views here.

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