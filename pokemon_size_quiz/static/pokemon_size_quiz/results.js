var within1 = 0;
var within6 = 0;
var within12 = 0;
var acc_raw = 0;
var count = 0;
var total_off = 0;

$(document).ready(function(){
    $("#history").css("width", $("#hist-list").width()+"px");
    
    $("span[name=guess]").each(function (){
        var inches = $(this).html();
        var pokemon = $(this).data("pokemon");
        var size = pokemon_sizes[pokemon-1];
        if (mode == "imperial")
            $(this).html(ft_in(inches));
        else
            $(this).html(in_m(inches) + " m");
        
        var difference = Math.round(Math.abs(inches - size) * 100)/100;
        var raw_diff = Math.round((inches - size) * 100)/100;
        
        var result = "Perfect!";
        if (raw_diff == 0)
            $(this).parent().css("background-color", "#A3FFA3");
        if (raw_diff > 0)
        {
            result = " too tall";
            $(this).parent().css("background-color", "#FFFFA3");
        }
        if (raw_diff < 0)
        {
            result = " too short";
            $(this).parent().css("background-color", "#A3A3FF");
        }
        
        if (result != "Perfect!")
        {
            if (mode == "imperial")
                bottom = ft_in(raw_diff) + " " + result;
            else
                bottom = in_m(raw_diff) + " m " + result;
        }
        
        var percent = Math.round((Math.min(inches, size) / Math.max(inches, size) * 100), 2);
        acc_raw += percent;
        
        if (difference <= 12)
            within12 += 1;
        if (difference <= 6)
            within6 += 1;
        if (difference <= 1)
            within1 += 1;
        
        $('div[name=diff-'+pokemon+']').html(bottom);
        $('div[name=acc-'+pokemon+']').html(percent + "%");
        
        total_off += difference;
        count += 1;
        
    });
    
    $('input[name=link]').click(function (){
        $(this).select();
    });
    
    var accuracy = parseInt(acc_raw / count)
    var avg_off = ft_in(Math.round((total_off / count) * 100)/100);
    $('#accuracy_percent').html(accuracy + "%");
    $('#avg_off').html(avg_off);
    $('#twitter_link').attr('href', encodeURI('https://twitter.com/share?text=I scored '+accuracy+'% on the Pokemon size quiz! Can you beat my score?&url=http://pokyfriends.com/pokemon-size-quiz/challenge/'+quiz_code));
    $('#tumblr_link').attr('href', encodeURI('http://www.tumblr.com/share/link?url=pokyfriends.com/pokemon-size-quiz/challenge/'+quiz_code+'&name=Pokemon Size Quiz&description=I scored '+accuracy+'% on the Pokemon size quiz! Can you beat my score?&tags=Quiz,Pokemon,Pokemon Size Quiz'));
    $('#within_12').html(within12);
    $('#within_6').html(within6);
    $('#within_1').html(within1);
    $('#hist-list').show();
});

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