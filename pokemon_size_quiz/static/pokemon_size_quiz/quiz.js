// These values are array indicies and thus are one smaller than the pokedex number range
var region_start = {"Kanto":0, "Johto":151, "Hoenn":251, "Sinnoh":386, "Unova":493, "Kalos":649, "rand20":0, "rand40":0, "rand100":0, "debug":0};
var region_end = {"Kanto":151, "Johto":251, "Hoenn":386, "Sinnoh":493, "Unova":649, "Kalos":721, "rand20":721, "rand40":721, "rand100":721, "debug":151};

var do_shuffle = true;
var pokedex = "Kanto";
var mode = "imperial";
var size = 20;
var possible = [];
var position = 0;
var order = [];
var data = [];
var total = 0;

var history = {};

$(document).ready(function (){
    $("#main").css("max-width", $("#main").width()+"px");
    $("#hist-list").css("max-width", $("#main").width()+"px");
    new_game();
    next_pokemon();
    $('#guess').removeAttr("disabled");

    $('#guess').keydown(function (key){
        if (key.which == 13)
            $('#confirm').click();
    });
    
    $('#confirm').click(function (){
        if ($('#guess').val() == "")
            return false;
        var input = get_guess();
        update_stats(input); 
        if (position != total)
            next_pokemon();
        else
            end_game();
            
        $('#guess').val('');
        //$("#guess").focus();
    });
    
    $("input[name=pokedex], input[name=size]").change(function (){
        new_game();
        next_pokemon();
    });
    
    // Calculator Style
    $("#keypad button").click(function (){
        var key =$(this).text();
        if (key == "BS")
            $("#guess").val($("#guess").val().slice(0,-1));
        else if (key == "OK")
            $("#confirm").click();
        else if (key == "ft.")
            $("#guess").val($("#guess").val() + "'");
        else if (key == "in.")
            $("#guess").val($("#guess").val() + "\"");
        else
            $("#guess").val($("#guess").val() + key);
    });
});

function next_pokemon()
{
    console.log("Position is " + position);
    $('#pokemon_name').html(pokemon_names[order[position] - 1]);
    $('#pokemon_image').attr('src', '/static/pokemon_size_quiz/sugimori/'+(order[position])+'.png');
    size = pokemon_sizes[order[position] - 1];
    //$('#debug').html(ft_in(size));
    position++;
}

function update_stats(input)
{
    var answer = size;
    var difference = Math.round(Math.abs(answer - input) * 100)/100;
    
    data.push({"pokemon": order[position - 1], "guess":input});
    
    var percent = Math.round((Math.min(answer, input) / Math.max(answer,input) * 100), 2);
    
    var old_percent = parseInt($('#accuracy_percent').html());
    var count = parseInt($('#progress').html());
    accuracy_percent = (old_percent * count + percent) / (count + 1);
    $('#accuracy_percent').html(parseInt(accuracy_percent));
    
    // Metric changes
    if (mode == "metric")
    {
        $("#guess").css("width", "2em");
        $("#metric").css("display", "inline-block");
    }
    
    // Display result
    var raw_diff = Math.round((answer - input) * 100)/100;
    var result = "Perfect!";
    var bg = "#A3FFA3";
    if (raw_diff < 0 && percent != 100)
    {
        result = "too tall";
        bg = "#FFFFA3";
    }
    if (raw_diff > 0 && percent != 100)
    {
        result = "too short";
        bg = "#A3A3FF";
    }
    
    if (result != "Perfect!")
    {
        if (mode == "imperial")
            bottom = ft_in(raw_diff) + " " + result;
        else
            bottom = in_m(raw_diff) + " m " + result;
    }
    else
        bottom = result;
    
    if (mode == "imperial")
    {
        $('#history').append('<div class="hist-frame" style="background-color: '+bg+'"><span class="pokefont">'+ft_in(answer)+'</span><br><div class="hist-img"><img src="/static/pokemon_size_quiz/sugimori/'+(order[position - 1])+'.png"></div><div class="hist-res"></div><div class="hist-acc pokefont"></div></div>');
        $('.hist-res').last().html(bottom);
    }
    else
    {
        $('#history').append('<div class="hist-frame" style="background-color: '+bg+'"><span class="pokefont">'+in_m(answer)+' m</span><br><div class="hist-img"><img src="/static/pokemon_size_quiz/sugimori/'+(order[position - 1])+'.png"></div><div class="hist-res"></div><div class="hist-acc pokefont"></div></div>');
        $('.hist-res').last().html(bottom);
    }
    $('.hist-acc').last().html(percent + "%");
    $('.list').show();
    $('#history').scrollLeft($('#history')[0].scrollWidth);
    
    
    if (difference <= 1) // 1 inch
    {
        $('#within_1').html(parseInt($('#within_1').html()) + 1);
        $('#within_6').html(parseInt($('#within_6').html()) + 1);
        $('#within_12').html(parseInt($('#within_12').html()) + 1);
    }
    else if (difference <= 6) // 6 inches
    {
        $('#within_6').html(parseInt($('#within_6').html()) + 1);
        $('#within_12').html(parseInt($('#within_12').html()) + 1);
    }
    else if (difference <= 12) // 12 inches
    {
        $('#within_12').html(parseInt($('#within_12').html()) + 1);
    }
    
    $('#progress').html(count + 1);
}

function get_guess()
{
    var guess = $('#guess').val();
    var feet = 0;
    var inches = 0;
    
    if ((guess.indexOf('"') != -1) && (guess.indexOf("'") == -1))
    {
        guess = parseFloat(guess.replace(/[^0-9.]/g, ''));
    }
    /* TODO: Accurate Metric Support
    else if (guess.indexOf("m") != -1 || mode == "metric")
    {
        guess = parseFloat(guess.replace(/[^0-9.]/g, '')) * 39.4;
        guess = guess.toFixed(1);
        mode = "metric";
        $("input[name=mode]").val("metric");
    }*/
    else
    {
        measurement = guess.split("'");
        var feet = (parseFloat(measurement[0]) + 0) + "";
        var inches = (parseFloat(measurement[1]) + 0) + "";
    
        feet = 1.0 * feet.replace(/[^0-9.]/g, '');
        inches = 1.0 * inches.replace(/[^0-9.]/g, '');
        guess = (feet * 12) + inches;
    }
    return guess;
}

function ft_in(i)
{   
    var feet = parseInt(i / 12);
    var inches = i % 12;
    inches = Math.round(inches * 100)/100;
    return Math.abs(feet) + "'" + Math.abs(inches) + '"';
}

function in_m(i)
{
    var output = parseFloat(i) / 39.4;
    output = output.toFixed(1);
    return Math.abs(output);
}

//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/shuffle [v1.0]
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

function new_game()
{
    $('input[name=data]').val("");
    $("#guess-wrapper").css("visibility", "visible");
    $("#submitting").hide();
    $("#hist-list").hide();
    
    if ($('#challenge').val() != "")
    {
        var challenge = $('#challenge').val();
        load_quiz(challenge);
        return;
    }
    
    pokedex = $("input[name=pokedex]:radio:checked").val();
    size = $("input[name=size]:radio:checked").val();
    // Calculate size
    full_size = 0;
    $("input[name=pokedex]:checked").each(function (){
        if ($(this).val() == "Kanto")
            full_size += 151;
        else if ($(this).val() == "Johto")
            full_size += 100;
        else if ($(this).val() == "Hoenn")
            full_size += 135;
        else if ($(this).val() == "Sinnoh")
            full_size += 107;
        else if ($(this).val() == "Unova")
            full_size += 156;
        else if ($(this).val() == "Kalos")
            full_size += 72;
    });
    
    // Force Kanto if nothing is checked
    if (full_size == 0)
    {
        $("input[name=pokedex][value=Kanto]").prop("checked", true);
        full_size = 151;
    }
    
    $("#full_size").html(full_size);
    
    // Calculate possible pokemon
    possible = [];
    $("input[name=pokedex]:checked").each(function (){
        if ($(this).val() == "Kanto")
        {
            for (var x = 1; x <= 151; x++)
                possible.push(x);
        }
        else if ($(this).val() == "Johto")
        {
            for (var x = 152; x <= 251; x++)
                possible.push(x);
        }
        else if ($(this).val() == "Hoenn")
        {
            for (var x = 252; x <= 386; x++)
                possible.push(x);
        }
        else if ($(this).val() == "Sinnoh")
        {
            for (var x = 387; x <= 493; x++)
                possible.push(x);
        }
        else if ($(this).val() == "Unova")
        {
            for (var x = 494; x <= 649; x++)
                possible.push(x);
        }
        else if ($(this).val() == "Kalos")
        {
            for (var x = 650; x <= 721; x++)
                possible.push(x);
        }
    });
    
    position = 0;
    order = [];
    data = [];
    total = 0;
    history = {};
    $('#history').html("");
    $('#accuracy_percent, #within_1, #within_6, #within_12, #progress').html("0");
    $('#guess').removeAttr("disabled");
    
    order = possible;
    if (do_shuffle)
        order = shuffle(possible);
    if (size == "pokedex")
        size = full_size;
    order = order.slice(0,size);
    
    total = order.length;
    $('.total').each(function (){
        $(this).html(total);
    });
    
    $('#debug').html(order.join(", "));
}

function end_game()
{
    $("#guess").attr("disabled", "disabled");
    $("#guess-wrapper").css("visibility", "hidden");
    $("#submitting").show();
    $("html, body").animate({
        scrollTop: $("#submitting").offset().top
    }, 500);
    
    var json = JSON.stringify(data);
    $('input[name=data]').val(decodeURIComponent(json));
}

function load_quiz(challenege)
{
    var pkmn_order = $('#challenge_order').val();
    order = pkmn_order.split(",");
    
    total = order.length;
    $('.total').each(function (){
        $(this).html(total);
    });
    
    $('#debug').html(order.join(", "));
}