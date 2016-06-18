var within1 = 0;
var within6 = 0;
var within12 = 0;
var acc_raw = 0;
var count = 0;
var total_off = 0;
var avg_off = 0;
var avg_off2 = 0;

var p1diff = [];
var p2diff = [];

$(document).ready(function(){
    $("#history").css("width", $("#hist-list").width()+"px");
    
    $("div[name=guess1]").each(function (){
        var inches = $(this).html();
        var pokemon = $(this).data("pokemon");
        var size = pokemon_sizes[pokemon-1];
        $(this).html(ft_in(inches));
        
        var difference = Math.round(Math.abs(inches - size) * 100)/100;
        var raw_diff = Math.round((inches - size) * 100)/100;
        
        p1diff.push(raw_diff);
        var result = "Perfect!";
        if (raw_diff > 0)
        {
            result = ft_in(raw_diff) + " too tall";
        }
        if (raw_diff < 0)
        {
            result = ft_in(raw_diff) + " too short";
        }
        
        var percent = Math.round((Math.min(inches, size) / Math.max(inches, size) * 100), 2);
        acc_raw += percent;
        
        if (difference <= 12)
            within12 += 1;
        if (difference <= 6)
            within6 += 1;
        if (difference <= 1)
            within1 += 1;
        
        $('div[name=diff1-'+pokemon+']').html(result);
        $('div[name=acc1-'+pokemon+']').html(percent + "%");
        
        total_off += difference;
        count += 1;
    });
    
    var accuracy = parseInt(acc_raw / count)
    avg_off = Math.round((total_off / count) * 100)/100;
    $('#accuracy_percent').html(accuracy + "%");
    $('#avg_off').html(ft_in(avg_off));
    $('#within_12').html(within12);
    $('#within_6').html(within6);
    $('#within_1').html(within1);
    
    // Player 2
    within1 = 0;
    within6 = 0;
    within12 = 0;
    total_off = 0;
    count = 0;
    acc_raw = 0;
    
    $("div[name=guess2]").each(function (){
        var inches = $(this).html();
        var pokemon = $(this).data("pokemon");
        var size = pokemon_sizes[pokemon-1];
        $(this).html(ft_in(inches));
        
        var difference = Math.round(Math.abs(inches - size) * 100)/100;
        var raw_diff = Math.round((inches - size) * 100)/100;
        
        p2diff.push(raw_diff);
        var result = "Perfect!";
        if (raw_diff > 0)
        {
            result = ft_in(raw_diff) + " too tall";
        }
        if (raw_diff < 0)
        {
            result = ft_in(raw_diff) + " too short";
        }
        
        var percent = Math.round((Math.min(inches, size) / Math.max(inches, size) * 100), 2);
        acc_raw += percent;
        
        if (difference <= 12)
            within12 += 1;
        if (difference <= 6)
            within6 += 1;
        if (difference <= 1)
            within1 += 1;
        
        $('div[name=diff2-'+pokemon+']').html(result);
        $('div[name=acc2-'+pokemon+']').html(percent + "%");
        
        total_off += difference;
        count += 1;
    });
    
    var accuracy = parseInt(acc_raw / count)
    avg_off2 = Math.round((total_off / count) * 100)/100;
    $('#2accuracy_percent').html(accuracy + "%");
    $('#2avg_off').html(ft_in(avg_off2));
    $('#2within_12').html(within12);
    $('#2within_6').html(within6);
    $('#2within_1').html(within1);
    
    // Answers
    $('div[name=answer]').each(function (){
        var pkmn = $(this).data("pokemon");
        var answer = pokemon_sizes[pkmn-1];
        $(this).html(ft_in(answer));
    });
    
    // Highlights
    for (var x = 0; x < p1diff.length; x++)
    {
        p1 = Math.abs(p1diff[x]);
        p2 = Math.abs(p2diff[x]);
        if (p1 < p2)
        {
            $('#p1a'+(x+1)).css("background-color", "#FFA3A3");
        }
        if (p1 > p2)
        {
            $('#p2a'+(x+1)).css("background-color", "#A3A3FF");
        }
        if (p1 == p2)
        {
            $('#p1a'+(x+1)).css("background-color", "#FFA3A3");
            $('#p2a'+(x+1)).css("background-color", "#A3A3FF");
        }
    }
    
    if (parseInt($('#within_12').html()) > parseInt($('#2within_12').html()))
        $('#p11f').css("background-color", "#FFA3A3");
    if (parseInt($('#within_12').html()) < parseInt($('#2within_12').html()))
        $('#p21f').css("background-color", "#A3A3FF");
    
    if (parseInt($('#within_6').html()) > parseInt($('#2within_6').html()))
        $('#p16i').css("background-color", "#FFA3A3");
    if (parseInt($('#within_6').html()) < parseInt($('#2within_6').html()))
        $('#p26i').css("background-color", "#A3A3FF");
        
    if (parseInt($('#within_1').html()) > parseInt($('#2within_1').html()))
        $('#p11i').css("background-color", "#FFA3A3");
    if (parseInt($('#within_1').html()) < parseInt($('#2within_1').html()))
        $('#p21i').css("background-color", "#A3A3FF");
        
    if ($('#accuracy_percent').html() > $('#2accuracy_percent').html())
        $('#p1acc').css("background-color", "#FFA3A3");
    if ($('#accuracy_percent').html() < $('#2accuracy_percent').html())
        $('#p2acc').css("background-color", "#A3A3FF");
    
    if (Math.abs(avg_off) < Math.abs(avg_off2))
        $('#p1off').css("background-color", "#FFA3A3");
    if (Math.abs(avg_off) > Math.abs(avg_off2))
        $('#p2off').css("background-color", "#A3A3FF");
    
    // Etc.
    $('input[name=link]').click(function (){
        $(this).select();
    });
        
    $('#twitter_link').attr('href', encodeURI('https://twitter.com/share?text=I scored '+accuracy+'% on the Pokemon size quiz! Can you beat my score?&url=http://pokyfriends.com/pokemon-size-quiz/challenge/'+quiz_code2));
    $('#tumblr_link').attr('href', encodeURI('http://www.tumblr.com/share/link?url=pokyfriends.com/pokemon-size-quiz/challenge/'+quiz_code2+'&name=Pokemon Size Quiz&description=I scores '+accuracy+'% on the Pokemon size quiz! Can you beat my score?&tags=Quiz,Pokemon,Pokemon Size Quiz'));
    $('#hist-list').show();
});

function ft_in(i)
{   
    var feet = parseInt(i / 12);
    var inches = i % 12;
    inches = Math.round(inches * 100)/100;
    return Math.abs(feet) + "'" + Math.abs(inches) + '"';
}