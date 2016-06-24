#!/usr/bin/python
# coding=utf-8

from __future__ import with_statement
from twitter import *
import random, sys, os


PUNC = [".!"]
BASE_DIR                = os.path.dirname(os.path.abspath(__file__))

POKEMON_NAMES = ["Abomasnow", "Abra", "Absol", "Accelgor", "Aegislash", "Aerodactyl", "Aggron", "Aipom", "Alakazam", "Alomomola", "Altaria", "Amaura", "Ambipom", "Amoonguss", "Ampharos", "Anorith", "Arbok", "Arcanine", "Arceus", "Archen", "Archeops", "Ariados", "Armaldo", "Aromatisse", "Aron", "Articuno", "Audino", "Aurorus", "Avalugg", "Axew", "Azelf", "Azumarill", "Azurill", "Bagon", "Baltoy", "Banette", "Barbaracle", "Barboach", "Basculin", "Bastiodon", "Bayleef", "Beartic", "Beautifly", "Beedrill", "Beheeyem", "Beldum", "Bellossom", "Bellsprout", "Bergmite", "Bibarel", "Bidoof", "Binacle", "Bisharp", "Blastoise", "Blaziken", "Blissey", "Blitzle", "Boldore", "Bonsly", "Bouffalant", "Braixen", "Braviary", "Breloom", "Bronzong", "Bronzor", "Budew", "Buizel", "Bulbasaur", "Buneary", "Bunnelby", "Burmy", "Butterfree", "Cacnea", "Cacturne", "Camerupt", "Carbink", "Carnivine", "Carracosta", "Carvanha", "Cascoon", "Castform", "Caterpie", "Celebi", "Chandelure", "Chansey", "Charizard", "Charmander", "Charmeleon", "Chatot", "Cherrim", "Cherubi", "Chesnaught", "Chespin", "Chikorita", "Chimchar", "Chimecho", "Chinchou", "Chingling", "Cinccino", "Clamperl", "Clauncher", "Clawitzer", "Claydol", "Clefable", "Clefairy", "Cleffa", "Cloyster", "Cobalion", "Cofagrigus", "Combee", "Combusken", "Conkeldurr", "Corphish", "Corsola", "Cottonee", "Cradily", "Cranidos", "Crawdaunt", "Cresselia", "Croagunk", "Crobat", "Croconaw", "Crustle", "Cryogonal", "Cubchoo", "Cubone", "Cyndaquil", "Darkrai", "Darmanitan", "Darumaka", "Dedenne", "Deerling", "Deino", "Delcatty", "Delibird", "Delphox", "Deoxys", "Dewgong", "Dewott", "Dialga", "Diggersby", "Diglett", "Ditto", "Dodrio", "Doduo", "Donphan", "Doublade", "Dragalge", "Dragonair", "Dragonite", "Drapion", "Dratini", "Drifblim", "Drifloon", "Drilbur", "Drowzee", "Druddigon", "Ducklett", "Dugtrio", "Dunsparce", "Duosion", "Durant", "Dusclops", "Dusknoir", "Duskull", "Dustox", "Dwebble", "Eelektrik", "Eelektross", "Eevee", "Ekans", "Electabuzz", "Electivire", "Electrike", "Electrode", "Elekid", "Elgyem", "Emboar", "Emolga", "Empoleon", "Entei", "Escavalier", "Espeon", "Espurr", "Excadrill", "Exeggcute", "Exeggutor", "Exploud", "Farfetch'd", "Fearow", "Feebas", "Fennekin", "Feraligatr", "Ferroseed", "Ferrothorn", "Finneon", "Flaaffy", u"Flabebe", "Flareon", "Fletchinder", "Fletchling", "Floatzel", "Floette", "Florges", "Flygon", "Foongus", "Forretress", "Fraxure", "Frillish", "Froakie", "Frogadier", "Froslass", "Furfrou", "Furret", "Gabite", "Gallade", "Galvantula", "Garbodor", "Garchomp", "Gardevoir", "Gastly", "Gastrodon", "Genesect", "Gengar", "Geodude", "Gible", "Gigalith", "Girafarig", "Giratina", "Glaceon", "Glalie", "Glameow", "Gligar", "Gliscor", "Gloom", "Gogoat", "Golbat", "Goldeen", "Golduck", "Golem", "Golett", "Golurk", "Goodra", "Goomy", "Gorebyss", "Gothita", "Gothitelle", "Gothorita", "Gourgeist", "Granbull", "Graveler", "Greninja", "Grimer", "Grotle", "Groudon", "Grovyle", "Growlithe", "Grumpig", "Gulpin", "Gurdurr", "Gyarados", "Happiny", "Hariyama", "Haunter", "Hawlucha", "Haxorus", "Heatmor", "Heatran", "Heliolisk", "Helioptile", "Heracross", "Herdier", "Hippopotas", "Hippowdon", "Hitmonchan", "Hitmonlee", "Hitmontop", "Ho-Oh", "Honchkrow", "Honedge", "Hoothoot", "Hoppip", "Horsea", "Houndoom", "Houndour", "Huntail", "Hydreigon", "Hypno", "Igglybuff", "Illumise", "Infernape", "Inkay", "Ivysaur", "Jellicent", "Jigglypuff", "Jirachi", "Jolteon", "Joltik", "Jumpluff", "Jynx", "Kabuto", "Kabutops", "Kadabra", "Kakuna", "Kangaskhan", "Karrablast", "Kecleon", "Keldeo", "Kingdra", "Kingler", "Kirlia", "Klang", "Klefki", "Klink", "Klinklang", "Koffing", "Krabby", "Kricketot", "Kricketune", "Krokorok", "Krookodile", "Kyogre", "Kyurem", "Lairon", "Lampent", "Landorus", "Lanturn", "Lapras", "Larvesta", "Larvitar", "Latias", "Latios", "Leafeon", "Leavanny", "Ledian", "Ledyba", "Lickilicky", "Lickitung", "Liepard", "Lileep", "Lilligant", "Lillipup", "Linoone", "Litleo", "Litwick", "Lombre", "Lopunny", "Lotad", "Loudred", "Lucario", "Ludicolo", "Lugia", "Lumineon", "Lunatone", "Luvdisc", "Luxio", "Luxray", "Machamp", "Machoke", "Machop", "Magby", "Magcargo", "Magikarp", "Magmar", "Magmortar", "Magnemite", "Magneton", "Magnezone", "Makuhita", "Malamar", "Mamoswine", "Manaphy", "Mandibuzz", "Manectric", "Mankey", "Mantine", "Mantyke", "Maractus", "Mareep", "Marill", "Marowak", "Marshtomp", "Masquerain", "Mawile", "Medicham", "Meditite", "Meganium", "Meloetta", "Meowstic", "Meowth", "Mesprit", "Metagross", "Metang", "Metapod", "Mew", "Mewtwo", "Mienfoo", "Mienshao", "Mightyena", "Milotic", "Miltank", "Mime Jr.", "Minccino", "Minun", "Misdreavus", "Mismagius", "Moltres", "Monferno", "Mothim", "Mr. Mime", "Mudkip", "Muk", "Munchlax", "Munna", "Murkrow", "Musharna", "Natu", "Nidoking", "Nidoqueen", u"Nidoran", u"Nidoran", "Nidorina", "Nidorino", "Nincada", "Ninetales", "Ninjask", "Noctowl", "Noibat", "Noivern", "Nosepass", "Numel", "Nuzleaf", "Octillery", "Oddish", "Omanyte", "Omastar", "Onix", "Oshawott", "Pachirisu", "Palkia", "Palpitoad", "Pancham", "Pangoro", "Panpour", "Pansage", "Pansear", "Paras", "Parasect", "Patrat", "Pawniard", "Pelipper", "Persian", "Petilil", "Phanpy", "Phantump", "Phione", "Pichu", "Pidgeot", "Pidgeotto", "Pidgey", "Pidove", "Pignite", "Pikachu", "Piloswine", "Pineco", "Pinsir", "Piplup", "Plusle", "Politoed", "Poliwag", "Poliwhirl", "Poliwrath", "Ponyta", "Poochyena", "Porygon", "Porygon2", "Porygon-Z", "Primeape", "Prinplup", "Probopass", "Psyduck", "Pumpkaboo", "Pupitar", "Purrloin", "Purugly", "Pyroar", "Quagsire", "Quilava", "Quilladin", "Qwilfish", "Raichu", "Raikou", "Ralts", "Rampardos", "Rapidash", "Raticate", "Rattata", "Rayquaza", "Regice", "Regigigas", "Regirock", "Registeel", "Relicanth", "Remoraid", "Reshiram", "Reuniclus", "Rhydon", "Rhyhorn", "Rhyperior", "Riolu", "Roggenrola", "Roselia", "Roserade", "Rotom", "Rufflet", "Sableye", "Salamence", "Samurott", "Sandile", "Sandshrew", "Sandslash", "Sawk", "Sawsbuck", "Scatterbug", "Sceptile", "Scizor", "Scolipede", "Scrafty", "Scraggy", "Scyther", "Seadra", "Seaking", "Sealeo", "Seedot", "Seel", "Seismitoad", "Sentret", "Serperior", "Servine", "Seviper", "Sewaddle", "Sharpedo", "Shaymin", "Shedinja", "Shelgon", "Shellder", "Shellos", "Shelmet", "Shieldon", "Shiftry", "Shinx", "Shroomish", "Shuckle", "Shuppet", "Sigilyph", "Silcoon", "Simipour", "Simisage", "Simisear", "Skarmory", "Skiddo", "Skiploom", "Skitty", "Skorupi", "Skrelp", "Skuntank", "Slaking", "Slakoth", "Sliggoo", "Slowbro", "Slowking", "Slowpoke", "Slugma", "Slurpuff", "Smeargle", "Smoochum", "Sneasel", "Snivy", "Snorlax", "Snorunt", "Snover", "Snubbull", "Solosis", "Solrock", "Spearow", "Spewpa", "Spheal", "Spinarak", "Spinda", "Spiritomb", "Spoink", "Spritzee", "Squirtle", "Stantler", "Staraptor", "Staravia", "Starly", "Starmie", "Staryu", "Steelix", "Stoutland", "Stunfisk", "Stunky", "Sudowoodo", "Suicune", "Sunflora", "Sunkern", "Surskit", "Swablu", "Swadloon", "Swalot", "Swampert", "Swanna", "Swellow", "Swinub", "Swirlix", "Swoobat", "Sylveon", "Taillow", "Talonflame", "Tangela", "Tangrowth", "Tauros", "Teddiursa", "Tentacool", "Tentacruel", "Tepig", "Terrakion", "Throh", "Thundurus", "Timburr", "Tirtouga", "Togekiss", "Togepi", "Togetic", "Torchic", "Torkoal", "Tornadus", "Torterra", "Totodile", "Toxicroak", "Tranquill", "Trapinch", "Treecko", "Trevenant", "Tropius", "Trubbish", "Turtwig", "Tympole", "Tynamo", "Typhlosion", "Tyranitar", "Tyrantrum", "Tyrogue", "Tyrunt", "Umbreon", "Unfezant", "Unown", "Ursaring", "Uxie", "Vanillish", "Vanillite", "Vanilluxe", "Vaporeon", "Venipede", "Venomoth", "Venonat", "Venusaur", "Vespiquen", "Vibrava", "Victini", "Victreebel", "Vigoroth", "Vileplume", "Virizion", "Vivillon", "Volbeat", "Volcarona", "Voltorb", "Vullaby", "Vulpix", "Wailmer", "Wailord", "Walrein", "Wartortle", "Watchog", "Weavile", "Weedle", "Weepinbell", "Weezing", "Whimsicott", "Whirlipede", "Whiscash", "Whismur", "Wigglytuff", "Wingull", "Wobbuffet", "Woobat", "Wooper", "Wormadam", "Wurmple", "Wynaut", "Xatu", "Xerneas", "Yamask", "Yanma", "Yanmega", "Yveltal", "Zangoose", "Zapdos", "Zebstrika", "Zekrom", "Zigzagoon", "Zoroark", "Zorua", "Zubat", "Zweilous", "Zygarde"]
REPLACEMENTS = {"its":"'s", "it":"", "it's":"'s", "they're":" are", "they":"", "their":"'s"}

if "NOTWEET" in sys.argv:
    TWEET = False
else:
    TWEET = True
 
def create_chain():
    markov_chain = {}
    word1 = "\n"
    word2 = "\n"
    with open(os.path.join(BASE_DIR, "pokedex_unique.txt")) as file:
        for line in file:
            for current_word in line.split():
                if current_word != "":
                    markov_chain.setdefault((word1, word2), []).append(current_word)
                    word1 = word2
                    word2 = current_word
    return markov_chain
 
def construct_sentence(markov_chain, char_count=200, starts_with=None):
    generated_sentence = ""
    if not starts_with:
        word_tuple = random.choice(markov_chain.keys())
    else:
        choices = []
        for tuple in markov_chain.keys():
            if tuple[0] == starts_with:
                choices.append(tuple)
        
        if not choices:
            print "NO CHAIN KEY BEGINS WITH", starts_with, "FALLING BACK TO A RANDOM KEY."
            word_tuple = random.choice(markov_chain.keys())
        else:    
            print "FOUND MATCHING KEY STARTING WITH", starts_with
            word_tuple = random.choice(choices)

    print "WORD_TUPLE", word_tuple
    w1 = word_tuple[0]
    w2 = word_tuple[1]
    
    generated_sentence = w1 + " " + w2
    lastword = ""
    newword = ""
    while True:
        #"total count" is a special key used to track word frequency.
        while lastword == newword:
            newword = random.choice(markov_chain[(w1, w2)])
        
        lastword = newword
        old = generated_sentence
        generated_sentence = generated_sentence + " " + newword
        w1 = w2
        w2 = newword
        if len(generated_sentence) > char_count:
            break
        
    return generated_sentence


def pokemon_name():
    idx = random.randint(0,len(POKEMON_NAMES)-1)
    return POKEMON_NAMES[idx]
    
#print "Creating markov chain..." 
markov_data = create_chain()
#print "Created"
#post = construct_sentence(markov_chain=markov_data, char_count=300, starts_with=random.choice(REPLACEMENTS.keys()))
post = construct_sentence(markov_chain=markov_data, char_count=500)
#print "RAW POST:"
#print len(post), post

# Clean up the post
post = post.replace("­ ", "")

# Trim the beginning
period_at = post.find(".")
exclaim_at = post.find("!")
if period_at == -1:
    period_at = 9999
if exclaim_at == - 1:
    exclaim_at = 9999
if period_at == 9999 and exclaim_at == 9999:
    slice = 0
else:
    slice = min(period_at, exclaim_at) + 1

post = post[slice:].strip()

post = post.strip()
#print len(post), post

# Trim the end
post = post[:140]

period_at = post.rfind(".")
exclaim_at = post.rfind("!")
end_slice = max(period_at, exclaim_at) + 1
if end_slice == 0:
    end_slice = 140
post = post[:end_slice]

# Pokemon name replacement if possible
lower = post.lower()
first = lower.split(" ")[0]

if first in ["its", "it", "it's", "they're", "they", "their"]:
    # Are there enough characters to replace the name?
    size = len(lower) - len(first) + 15
    if size <= 140:
        # "It is said" check
        if first == "it" and lower[:10] == "it is said":
            # Do nothing
            None
        else:
            post = post[len(first):]
            post = pokemon_name() + REPLACEMENTS[first] + post
            
    # Safety slice
    post = post[:140]


if TWEET:
    twitter = Twitter(auth=OAuth(TWITTER_OAUTH_TOKEN, TWITTER_OAUTH_SECRET, TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET))
    resp = twitter.statuses.update(status=post)
    print post
    print resp
else:
    print "DID NOT TWEET"
    print post
print "-"*40