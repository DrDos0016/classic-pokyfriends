// To anybody asking "Why would you put the answers in your quiz right in the easily viewed source?"
// I can only answer with "You're already on the internet. If you want to cheat it's not hard to go to Bulbapedia and get the same data there.

var kanto_names     = ["bulbasaur", "ivysaur", "venusaur", "charmander", "charmeleon", "charizard", "squirtle", "wartortle", "blastoise", "caterpie", "metapod", "butterfree", "weedle", "kakuna", "beedrill", "pidgey", "pidgeotto", "pidgeot", "rattata", "raticate", "spearow", "fearow", "ekans", "arbok", "pikachu", "raichu", "sandshrew", "sandslash", "nidoran ♀", "nidorina", "nidoqueen", "nidoran ♂", "nidorino", "nidoking", "clefairy", "clefable", "vulpix", "ninetales", "jigglypuff", "wigglytuff", "zubat", "golbat", "oddish", "gloom", "vileplume", "paras", "parasect", "venonat", "venomoth", "diglett", "dugtrio", "meowth", "persian", "psyduck", "golduck", "mankey", "primeape", "growlithe", "arcanine", "poliwag", "poliwhirl", "poliwrath", "abra", "kadabra", "alakazam", "machop", "machoke", "machamp", "bellsprout", "weepinbell", "victreebel", "tentacool", "tentacruel", "geodude", "graveler", "golem", "ponyta", "rapidash", "slowpoke", "slowbro", "magnemite", "magneton", "farfetchd", "doduo", "dodrio", "seel", "dewgong", "grimer", "muk", "shellder", "cloyster", "gastly", "haunter", "gengar", "onix", "drowzee", "hypno", "krabby", "kingler", "voltorb", "electrode", "exeggcute", "exeggutor", "cubone", "marowak", "hitmonlee", "hitmonchan", "lickitung", "koffing", "weezing", "rhyhorn", "rhydon", "chansey", "tangela", "kangaskhan", "horsea", "seadra", "goldeen", "seaking", "staryu", "starmie", "mr-mime", "scyther", "jynx", "electabuzz", "magmar", "pinsir", "tauros", "magikarp", "gyarados", "lapras", "ditto", "eevee", "vaporeon", "jolteon", "flareon", "porygon", "omanyte", "omastar", "kabuto", "kabutops", "aerodactyl", "snorlax", "articuno", "zapdos", "moltres", "dratini", "dragonair", "dragonite", "mewtwo", "mew"];
var johto_names     = ["chikorita", "bayleef", "meganium", "cyndaquil", "quilava", "typhlosion", "totodile", "croconaw", "feraligatr", "sentret", "furret", "hoothoot", "noctowl", "ledyba", "ledian", "spinarak", "ariados", "crobat", "chinchou", "lanturn", "pichu", "cleffa", "igglybuff", "togepi", "togetic", "natu", "xatu", "mareep", "flaaffy", "ampharos", "bellossom", "marill", "azumarill", "sudowoodo", "politoed", "hoppip", "skiploom", "jumpluff", "aipom", "sunkern", "sunflora", "yanma", "wooper", "quagsire", "espeon", "umbreon", "murkrow", "slowking", "misdreavus", "unown", "wobbuffet", "girafarig", "pineco", "forretress", "dunsparce", "gligar", "steelix", "snubbull", "granbull", "qwilfish", "scizor", "shuckle", "heracross", "sneasel", "teddiursa", "ursaring", "slugma", "magcargo", "swinub", "piloswine", "corsola", "remoraid", "octillery", "delibird", "mantine", "skarmory", "houndour", "houndoom", "kingdra", "phanpy", "donphan", "porygon2", "stantler", "smeargle", "tyrogue", "hitmontop", "smoochum", "elekid", "magby", "miltank", "blissey", "raikou", "entei", "suicune", "larvitar", "pupitar", "tyranitar", "lugia", "ho-oh", "celebi"];
var hoenn_names     = ["treecko", "grovyle", "sceptile", "torchic", "combusken", "blaziken", "mudkip", "marshtomp", "swampert", "poochyena", "mightyena", "zigzagoon", "linoone", "wurmple", "silcoon", "beautifly", "cascoon", "dustox", "lotad", "lombre", "ludicolo", "seedot", "nuzleaf", "shiftry", "taillow", "swellow", "wingull", "pelipper", "ralts", "kirlia", "gardevoir", "surskit", "masquerain", "shroomish", "breloom", "slakoth", "vigoroth", "slaking", "nincada", "ninjask", "shedinja", "whismur", "loudred", "exploud", "makuhita", "hariyama", "azurill", "nosepass", "skitty", "delcatty", "sableye", "mawile", "aron", "lairon", "aggron", "meditite", "medicham", "electrike", "manectric", "plusle", "minun", "volbeat", "illumise", "roselia", "gulpin", "swalot", "carvanha", "sharpedo", "wailmer", "wailord", "numel", "camerupt", "torkoal", "spoink", "grumpig", "spinda", "trapinch", "vibrava", "flygon", "cacnea", "cacturne", "swablu", "altaria", "zangoose", "seviper", "lunatone", "solrock", "barboach", "whiscash", "corphish", "crawdaunt", "baltoy", "claydol", "lileep", "cradily", "anorith", "armaldo", "feebas", "milotic", "castform", "kecleon", "shuppet", "banette", "duskull", "dusclops", "tropius", "chimecho", "absol", "wynaut", "snorunt", "glalie", "spheal", "sealeo", "walrein", "clamperl", "huntail", "gorebyss", "relicanth", "luvdisc", "bagon", "shelgon", "salamence", "beldum", "metang", "metagross", "regirock", "regice", "registeel", "latias", "latios", "kyogre", "groudon", "rayquaza", "jirachi", "deoxys"];
var sinnoh_names    = ["turtwig", "grotle", "torterra", "chimchar", "monferno", "infernape", "piplup", "prinplup", "empoleon", "starly", "staravia", "staraptor", "bidoof", "bibarel", "kricketot", "kricketune", "shinx", "luxio", "luxray", "budew", "roserade", "cranidos", "rampardos", "shieldon", "bastiodon", "burmy", "wormadam", "mothim", "combee", "vespiquen", "pachirisu", "buizel", "floatzel", "cherubi", "cherrim", "shellos", "gastrodon", "ambipom", "drifloon", "drifblim", "buneary", "lopunny", "mismagius", "honchkrow", "glameow", "purugly", "chingling", "stunky", "skuntank", "bronzor", "bronzong", "bonsly", "mime-jr", "happiny", "chatot", "spiritomb", "gible", "gabite", "garchomp", "munchlax", "riolu", "lucario", "hippopotas", "hippowdon", "skorupi", "drapion", "croagunk", "toxicroak", "carnivine", "finneon", "lumineon", "mantyke", "snover", "abomasnow", "weavile", "magnezone", "lickilicky", "rhyperior", "tangrowth", "electivire", "magmortar", "togekiss", "yanmega", "leafeon", "glaceon", "gliscor", "mamoswine", "porygon-z", "gallade", "probopass", "dusknoir", "froslass", "rotom", "uxie", "mesprit", "azelf", "dialga", "palkia", "heatran", "regigigas", "giratina", "cresselia", "phione", "manaphy", "darkrai", "shaymin", "arceus"];
var unova_names     = ["victini", "snivy", "servine", "serperior", "tepig", "pignite", "emboar", "oshawott", "dewott", "samurott", "patrat", "watchog", "lillipup", "herdier", "stoutland", "purrloin", "liepard", "pansage", "simisage", "pansear", "simisear", "panpour", "simipour", "munna", "musharna", "pidove", "tranquill", "unfezant", "blitzle", "zebstrika", "roggenrola", "boldore", "gigalith", "woobat", "swoobat", "drilbur", "excadrill", "audino", "timburr", "gurdurr", "conkeldurr", "tympole", "palpitoad", "seismitoad", "throh", "sawk", "sewaddle", "swadloon", "leavanny", "venipede", "whirlipede", "scolipede", "cottonee", "whimsicott", "petilil", "lilligant", "basculin", "sandile", "krokorok", "krookodile", "darumaka", "darmanitan", "maractus", "dwebble", "crustle", "scraggy", "scrafty", "sigilyph", "yamask", "cofagrigus", "tirtouga", "carracosta", "archen", "archeops", "trubbish", "garbodor", "zorua", "zoroark", "minccino", "cinccino", "gothita", "gothorita", "gothitelle", "solosis", "duosion", "reuniclus", "ducklett", "swanna", "vanillite", "vanillish", "vanilluxe", "deerling", "sawsbuck", "emolga", "karrablast", "escavalier", "foongus", "amoonguss", "frillish", "jellicent", "alomomola", "joltik", "galvantula", "ferroseed", "ferrothorn", "klink", "klang", "klinklang", "tynamo", "eelektrik", "eelektross", "elgyem", "beheeyem", "litwick", "lampent", "chandelure", "axew", "fraxure", "haxorus", "cubchoo", "beartic", "cryogonal", "shelmet", "accelgor", "stunfisk", "mienfoo", "mienshao", "druddigon", "golett", "golurk", "pawniard", "bisharp", "bouffalant", "rufflet", "braviary", "vullaby", "mandibuzz", "heatmor", "durant", "deino", "zweilous", "hydreigon", "larvesta", "volcarona", "cobalion", "terrakion", "virizion", "tornadus", "thundurus", "reshiram", "zekrom", "landorus", "kyurem", "keldeo", "meloetta", "genesect"];
var kalos_names     = ["chespin", "quilladin", "chesnaught", "fennekin", "braixen", "delphox", "froakie", "frogadier", "greninja", "bunnelby", "diggersby", "fletchling", "fletchinder", "talonflame", "scatterbug", "spewpa", "vivillon", "litleo", "pyroar", "flabébé", "floette", "florges", "skiddo", "gogoat", "pancham", "pangoro", "furfrou", "espurr", "meowstic", "honedge", "doublade", "aegislash", "spritzee", "aromatisse", "swirlix", "slurpuff", "inkay", "malamar", "binacle", "barbaracle", "skrelp", "dragalge", "clauncher", "clawitzer", "helioptile", "heliolisk", "tyrunt", "tyrantrum", "amaura", "aurorus", "sylveon", "hawlucha", "dedenne", "carbink", "goomy", "sliggoo", "goodra", "klefki", "phantump", "trevenant", "pumpkaboo", "gourgeist", "bergmite", "avalugg", "noibat", "noivern", "xerneas", "yveltal", "zygarde", "diancie", "hoopa", "volcanion"];
var pokemon_names   = kanto_names.concat(johto_names, hoenn_names, sinnoh_names, unova_names, kalos_names);
var pokemon_sizes_m = [0.7, 1.0, 2.0, 0.6, 1.1, 1.7, 0.5, 1.0, 1.6, 0.3, 0.7, 1.1, 0.3, 0.6, 1.0, 0.3, 1.1, 1.5, 0.3, 0.7, 0.3, 1.2, 2.0, 3.5, 0.4, 0.8, 0.6, 1.0, 0.4, 0.8, 1.3, 0.5, 0.9, 1.4, 0.6, 1.3, 0.6, 1.1, 0.5, 1.0, 0.8, 1.6, 0.5, 0.8, 1.2, 0.3, 1.0, 1.0, 1.5, 0.2, 0.7, 0.4, 1.0, 0.8, 1.7, 0.5, 1.0, 0.7, 1.9, 0.6, 1.0, 1.3, 0.9, 1.3, 1.5, 0.8, 1.5, 1.6, 0.7, 1.0, 1.7, 0.9, 1.6, 0.4, 1.0, 1.4, 1.0, 1.7, 1.2, 1.6, 0.3, 1.0, 0.8, 1.4, 1.8, 1.1, 1.7, 0.9, 1.2, 0.3, 1.5, 1.3, 1.6, 1.5, 8.8, 1.0, 1.6, 0.4, 1.3, 0.5, 1.2, 0.4, 2.0, 0.4, 1.0, 1.5, 1.4, 1.2, 0.6, 1.2, 1.0, 1.9, 1.1, 1.0, 2.2, 0.4, 1.2, 0.6, 1.3, 0.8, 1.1, 1.3, 1.5, 1.4, 1.1, 1.3, 1.5, 1.4, 0.9, 6.5, 2.5, 0.3, 0.3, 1.0, 0.8, 0.9, 0.8, 0.4, 1.0, 0.5, 1.3, 1.8, 2.1, 1.7, 1.6, 2.0, 1.8, 4.0, 2.2, 2.0, 0.4, 0.9, 1.2, 1.8, 0.5, 0.9, 1.7, 0.6, 1.1, 2.3, 0.8, 1.8, 0.7, 1.6, 1.0, 1.4, 0.5, 1.1, 1.8, 0.5, 1.2, 0.3, 0.3, 0.3, 0.3, 0.6, 0.2, 1.5, 0.6, 0.8, 1.4, 0.4, 0.4, 0.8, 1.2, 1.1, 0.4, 0.6, 0.8, 0.8, 0.3, 0.8, 1.2, 0.4, 1.4, 0.9, 1.0, 0.5, 2.0, 0.7, 0.5, 1.3, 1.5, 0.6, 1.2, 1.5, 1.1, 9.2, 0.6, 1.4, 0.5, 1.8, 0.6, 1.5, 0.9, 0.6, 1.8, 0.7, 0.8, 0.4, 1.1, 0.6, 0.6, 0.9, 0.9, 2.1, 1.7, 0.6, 1.4, 1.8, 0.5, 1.1, 0.6, 1.4, 1.2, 0.7, 1.4, 0.4, 0.6, 0.7, 1.2, 1.5, 1.9, 2.1, 2.0, 0.6, 1.2, 2.0, 5.2, 3.8, 0.6, 0.5, 0.9, 1.7, 0.4, 0.9, 1.9, 0.4, 0.7, 1.5, 0.5, 1.0, 0.4, 0.5, 0.3, 0.6, 1.0, 0.7, 1.2, 0.5, 1.2, 1.5, 0.5, 1.0, 1.3, 0.3, 0.7, 0.6, 1.2, 0.4, 0.8, 1.6, 0.5, 0.8, 0.4, 1.2, 0.8, 1.4, 2.0, 0.5, 0.8, 0.8, 0.6, 1.0, 1.5, 1.0, 2.3, 0.2, 1.0, 0.6, 1.1, 0.5, 0.6, 0.4, 0.9, 2.1, 0.6, 1.3, 0.6, 1.5, 0.4, 0.4, 0.7, 0.6, 0.3, 0.4, 1.7, 0.8, 1.8, 2.0, 14.5, 0.7, 1.9, 0.5, 0.7, 0.9, 1.1, 0.7, 1.1, 2.0, 0.4, 1.3, 0.4, 1.1, 1.3, 2.7, 1.0, 1.2, 0.4, 0.9, 0.6, 1.1, 0.5, 1.5, 1.0, 1.5, 0.7, 1.5, 0.6, 6.2, 0.3, 1.0, 0.6, 1.1, 0.8, 1.6, 2.0, 0.6, 1.2, 0.6, 0.7, 1.5, 0.8, 1.1, 1.4, 0.4, 1.7, 1.8, 1.0, 0.6, 0.6, 1.1, 1.5, 0.6, 1.2, 1.6, 1.7, 1.8, 1.9, 1.4, 2.0, 4.5, 3.5, 7.0, 0.3, 1.7, 0.4, 1.1, 2.2, 0.5, 0.9, 1.2, 0.4, 0.8, 1.7, 0.3, 0.6, 1.2, 0.5, 1.0, 0.3, 1.0, 0.5, 0.9, 1.4, 0.2, 0.9, 0.9, 1.6, 0.5, 1.3, 0.2, 0.5, 0.9, 0.3, 1.2, 0.4, 0.7, 1.1, 0.4, 0.5, 0.3, 0.9, 1.2, 0.4, 1.2, 0.4, 1.2, 0.9, 0.9, 0.5, 1.0, 0.2, 0.4, 1.0, 0.5, 1.3, 0.5, 0.6, 0.6, 0.5, 1.0, 0.7, 1.4, 1.9, 0.6, 0.7, 1.2, 0.8, 2.0, 0.8, 1.3, 0.7, 1.3, 1.4, 0.4, 1.2, 1.0, 1.0, 2.2, 1.1, 1.2, 1.7, 2.4, 2.0, 1.8, 1.6, 1.5, 1.9, 1.0, 0.8, 2.0, 2.5, 0.9, 1.6, 1.4, 2.2, 1.3, 0.3, 0.3, 0.3, 0.3, 5.4, 4.2, 1.7, 3.7, 6.9, 1.5, 0.4, 0.3, 1.5, 0.4, 3.2, 0.4, 0.6, 0.8, 3.3, 0.5, 1.0, 1.6, 0.5, 0.8, 1.5, 0.5, 1.1, 0.4, 0.9, 1.2, 0.4, 1.1, 0.6, 1.1, 0.6, 1.0, 0.6, 1.0, 0.6, 1.1, 0.3, 0.6, 1.2, 0.8, 1.6, 0.4, 0.9, 1.7, 0.4, 0.9, 0.3, 0.7, 1.1, 0.6, 1.2, 1.4, 0.5, 0.8, 1.5, 1.3, 1.4, 0.3, 0.5, 1.2, 0.4, 1.2, 2.5, 0.3, 0.7, 0.5, 1.1, 1.0, 0.7, 1.0, 1.5, 0.6, 1.3, 1.0, 0.3, 1.4, 0.6, 1.1, 1.4, 0.5, 1.7, 0.7, 1.2, 0.5, 1.4, 0.6, 1.9, 0.7, 1.6, 0.4, 0.5, 0.4, 0.7, 1.5, 0.3, 0.6, 1.0, 0.5, 1.3, 0.4, 1.1, 1.3, 0.6, 1.9, 0.4, 0.5, 1.0, 0.2, 0.6, 1.2, 2.2, 1.2, 0.1, 0.8, 0.6, 1.0, 0.3, 0.6, 0.6, 0.2, 1.2, 2.1, 0.5, 1.0, 0.3, 0.6, 1.0, 0.6, 1.0, 1.8, 0.5, 2.6, 1.1, 0.4, 0.8, 0.7, 0.9, 1.4, 1.6, 1.0, 2.8, 0.5, 1.6, 1.6, 0.5, 1.5, 0.5, 1.2, 1.4, 0.3, 0.8, 1.4, 1.8, 1.1, 1.6, 2.1, 1.9, 2.0, 1.4, 3.0, 3.2, 2.9, 1.3, 3.6, 1.4, 0.6, 1.5, 0.4, 0.7, 1.6, 0.4, 1.0, 1.5, 0.3, 0.6, 1.5, 0.4, 1.0, 0.3, 0.7, 1.2, 0.3, 0.3, 1.2, 0.6, 1.5, 0.1, 0.2, 1.1, 0.9, 1.7, 0.6, 2.1, 1.2, 0.3, 0.6, 0.8, 0.8, 1.7, 0.2, 0.8, 0.4, 0.8, 0.4, 1.5, 0.5, 1.3, 0.5, 1.8, 0.5, 1.3, 0.5, 1.0, 0.8, 2.5, 1.3, 2.7, 1.0, 0.8, 0.2, 0.3, 0.3, 0.8, 2.0, 0.2, 0.4, 1.5, 0.4, 0.9, 1.0, 2.0, 0.5, 1.5, 3.0, 5.8, 5.0, 0.7, 0.5];
var pokemon_sizes_i = [27.6, 39.4, 78.7, 23.6, 43.3, 66.9, 19.7, 39.4, 63.0, 11.8, 27.6, 43.3, 11.8, 23.6, 39.4, 11.8, 43.3, 59.1, 11.8, 27.6, 11.8, 47.2, 78.7, 137.8, 15.7, 31.5, 23.6, 39.4, 15.7, 31.5, 51.2, 19.7, 35.4, 55.1, 23.6, 51.2, 23.6, 43.3, 19.7, 39.4, 31.5, 63.0, 19.7, 31.5, 47.2, 11.8, 39.4, 39.4, 59.1, 7.9, 27.6, 15.7, 39.4, 31.5, 66.9, 19.7, 39.4, 27.6, 74.8, 23.6, 39.4, 51.2, 35.4, 51.2, 59.1, 31.5, 59.1, 63.0, 27.6, 39.4, 66.9, 35.4, 63.0, 15.7, 39.4, 55.1, 39.4, 66.9, 47.2, 63.0, 11.8, 39.4, 31.5, 55.1, 70.9, 43.3, 66.9, 35.4, 47.2, 11.8, 59.1, 51.2, 63.0, 59.1, 346.5, 39.4, 63.0, 15.7, 51.2, 19.7, 47.2, 15.7, 78.7, 15.7, 39.4, 59.1, 55.1, 47.2, 23.6, 47.2, 39.4, 74.8, 43.3, 39.4, 86.6, 15.7, 47.2, 23.6, 51.2, 31.5, 43.3, 51.2, 59.1, 55.1, 43.3, 51.2, 59.1, 55.1, 35.4, 255.9, 98.4, 11.8, 11.8, 39.4, 31.5, 35.4, 31.5, 15.7, 39.4, 19.7, 51.2, 70.9, 82.7, 66.9, 63.0, 78.7, 70.9, 157.5, 86.6, 78.7, 15.7, 35.4, 47.2, 70.9, 19.7, 35.4, 66.9, 23.6, 43.3, 90.6, 31.5, 70.9, 27.6, 63.0, 39.4, 55.1, 19.7, 43.3, 70.9, 19.7, 47.2, 11.8, 11.8, 11.8, 11.8, 23.6, 7.9, 59.1, 23.6, 31.5, 55.1, 15.7, 15.7, 31.5, 47.2, 43.3, 15.7, 23.6, 31.5, 31.5, 11.8, 31.5, 47.2, 15.7, 55.1, 35.4, 39.4, 19.7, 78.7, 27.6, 19.7, 51.2, 59.1, 23.6, 47.2, 59.1, 43.3, 362.2, 23.6, 55.1, 19.7, 70.9, 23.6, 59.1, 35.4, 23.6, 70.9, 27.6, 31.5, 15.7, 43.3, 23.6, 23.6, 35.4, 35.4, 82.7, 66.9, 23.6, 55.1, 70.9, 19.7, 43.3, 23.6, 55.1, 47.2, 27.6, 55.1, 15.7, 23.6, 27.6, 47.2, 59.1, 74.8, 82.7, 78.7, 23.6, 47.2, 78.7, 204.7, 149.6, 23.6, 19.7, 35.4, 66.9, 15.7, 35.4, 74.8, 15.7, 27.6, 59.1, 19.7, 39.4, 15.7, 19.7, 11.8, 23.6, 39.4, 27.6, 47.2, 19.7, 47.2, 59.1, 19.7, 39.4, 51.2, 11.8, 27.6, 23.6, 47.2, 15.7, 31.5, 63.0, 19.7, 31.5, 15.7, 47.2, 31.5, 55.1, 78.7, 19.7, 31.5, 31.5, 23.6, 39.4, 59.1, 39.4, 90.6, 7.9, 39.4, 23.6, 43.3, 19.7, 23.6, 15.7, 35.4, 82.7, 23.6, 51.2, 23.6, 59.1, 15.7, 15.7, 27.6, 23.6, 11.8, 15.7, 66.9, 31.5, 70.9, 78.7, 570.9, 27.6, 74.8, 19.7, 27.6, 35.4, 43.3, 27.6, 43.3, 78.7, 15.7, 51.2, 15.7, 43.3, 51.2, 106.3, 39.4, 47.2, 15.7, 35.4, 23.6, 43.3, 19.7, 59.1, 39.4, 59.1, 27.6, 59.1, 23.6, 244.1, 11.8, 39.4, 23.6, 43.3, 31.5, 63.0, 78.7, 23.6, 47.2, 23.6, 27.6, 59.1, 31.5, 43.3, 55.1, 15.7, 66.9, 70.9, 39.4, 23.6, 23.6, 43.3, 59.1, 23.6, 47.2, 63.0, 66.9, 70.9, 74.8, 55.1, 78.7, 177.2, 137.8, 275.6, 11.8, 66.9, 15.7, 43.3, 86.6, 19.7, 35.4, 47.2, 15.7, 31.5, 66.9, 11.8, 23.6, 47.2, 19.7, 39.4, 11.8, 39.4, 19.7, 35.4, 55.1, 7.9, 35.4, 35.4, 63.0, 19.7, 51.2, 7.9, 19.7, 35.4, 11.8, 47.2, 15.7, 27.6, 43.3, 15.7, 19.7, 11.8, 35.4, 47.2, 15.7, 47.2, 15.7, 47.2, 35.4, 35.4, 19.7, 39.4, 7.9, 15.7, 39.4, 19.7, 51.2, 19.7, 23.6, 23.6, 19.7, 39.4, 27.6, 55.1, 74.8, 23.6, 27.6, 47.2, 31.5, 78.7, 31.5, 51.2, 27.6, 51.2, 55.1, 15.7, 47.2, 39.4, 39.4, 86.6, 43.3, 47.2, 66.9, 94.5, 78.7, 70.9, 63.0, 59.1, 74.8, 39.4, 31.5, 78.7, 98.4, 35.4, 63.0, 55.1, 86.6, 51.2, 11.8, 11.8, 11.8, 11.8, 212.6, 165.4, 66.9, 145.7, 271.7, 59.1, 15.7, 11.8, 59.1, 15.7, 126.0, 15.7, 23.6, 31.5, 129.9, 19.7, 39.4, 63.0, 19.7, 31.5, 59.1, 19.7, 43.3, 15.7, 35.4, 47.2, 15.7, 43.3, 23.6, 43.3, 23.6, 39.4, 23.6, 39.4, 23.6, 43.3, 11.8, 23.6, 47.2, 31.5, 63.0, 15.7, 35.4, 66.9, 15.7, 35.4, 11.8, 27.6, 43.3, 23.6, 47.2, 55.1, 19.7, 31.5, 59.1, 51.2, 55.1, 11.8, 19.7, 47.2, 15.7, 47.2, 98.4, 11.8, 27.6, 19.7, 43.3, 39.4, 27.6, 39.4, 59.1, 23.6, 51.2, 39.4, 11.8, 55.1, 23.6, 43.3, 55.1, 19.7, 66.9, 27.6, 47.2, 19.7, 55.1, 23.6, 74.8, 27.6, 63.0, 15.7, 19.7, 15.7, 27.6, 59.1, 11.8, 23.6, 39.4, 19.7, 51.2, 15.7, 43.3, 51.2, 23.6, 74.8, 15.7, 19.7, 39.4, 7.9, 23.6, 47.2, 86.6, 47.2, 3.9, 31.5, 23.6, 39.4, 11.8, 23.6, 23.6, 7.9, 47.2, 82.7, 19.7, 39.4, 11.8, 23.6, 39.4, 23.6, 39.4, 70.9, 19.7, 102.4, 43.3, 15.7, 31.5, 27.6, 35.4, 55.1, 63.0, 39.4, 110.2, 19.7, 63.0, 63.0, 19.7, 59.1, 19.7, 47.2, 55.1, 11.8, 31.5, 55.1, 70.9, 43.3, 63.0, 82.7, 74.8, 78.7, 55.1, 118.1, 126.0, 114.2, 51.2, 141.7, 55.1, 23.6, 59.1, 15.7, 27.6, 63.0, 15.7, 39.4, 59.1, 11.8, 23.6, 59.1, 15.7, 39.4, 11.8, 27.6, 47.2, 11.8, 11.8, 47.2, 23.6, 59.1, 3.9, 7.9, 43.3, 35.4, 66.9, 23.6, 82.7, 47.2, 11.8, 23.6, 31.5, 31.5, 66.9, 7.9, 31.5, 15.7, 31.5, 15.7, 59.1, 19.7, 51.2, 19.7, 70.9, 19.7, 51.2, 19.7, 39.4, 31.5, 98.4, 51.2, 106.3, 39.4, 31.5, 7.9, 11.8, 11.8, 31.5, 78.7, 7.9, 15.7, 59.1, 15.7, 35.4, 39.4, 78.7, 19.7, 59.1, 118.1, 228.3, 196.9, 27.6, 19.7];
var pokemon_sizes   = pokemon_sizes_i;