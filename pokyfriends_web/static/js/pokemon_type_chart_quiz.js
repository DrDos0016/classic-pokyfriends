var idx = -1;
var data = ["Bug-Bug=1", "Bug-Dark=2", "Bug-Dragon=1", "Bug-Electric=1", "Bug-Fairy=0.5", "Bug-Fighting=0.5", "Bug-Fire=0.5", "Bug-Flying=0.5", "Bug-Ghost=0.5", "Bug-Grass=2", 
    "Bug-Ground=1", "Bug-Ice=1", "Bug-Normal=1", "Bug-Poison=0.5", "Bug-Psychic=2", "Bug-Rock=1", "Bug-Steel=0.5", "Bug-Water=1", 
    "Dark-Bug=1", "Dark-Dark=0.5", "Dark-Dragon=1", "Dark-Electric=1", "Dark-Fairy=0.5", "Dark-Fighting=0.5", "Dark-Fire=1", "Dark-Flying=1", "Dark-Ghost=2", "Dark-Grass=1", 
    "Dark-Ground=1", "Dark-Ice=1", "Dark-Normal=1", "Dark-Poison=1", "Dark-Psychic=2", "Dark-Rock=1", "Dark-Steel=1", "Dark-Water=1", 
    "Dragon-Bug=1", "Dragon-Dark=1", "Dragon-Dragon=2", "Dragon-Electric=1", "Dragon-Fairy=0", "Dragon-Fighting=1", "Dragon-Fire=1", "Dragon-Flying=1", "Dragon-Ghost=1", 
    "Dragon-Grass=1", "Dragon-Ground=1", "Dragon-Ice=1", "Dragon-Normal=1", "Dragon-Poison=1", "Dragon-Psychic=1", "Dragon-Rock=1", "Dragon-Steel=0.5", "Dragon-Water=1", 
    "Electric-Bug=1", "Electric-Dark=1", "Electric-Dragon=0.5", "Electric-Electric=0.5", "Electric-Fairy=1", "Electric-Fighting=1", "Electric-Fire=1", "Electric-Flying=2", 
    "Electric-Ghost=1", "Electric-Grass=0.5", "Electric-Ground=0", "Electric-Ice=1", "Electric-Normal=1", "Electric-Poison=1", "Electric-Psychic=1", "Electric-Rock=1", 
    "Electric-Steel=1", "Electric-Water=2", "Fairy-Bug=1", "Fairy-Dark=2", "Fairy-Dragon=2", "Fairy-Electric=1", "Fairy-Fairy=1", "Fairy-Fighting=2", "Fairy-Fire=0.5", 
    "Fairy-Flying=1", "Fairy-Ghost=1", "Fairy-Grass=1", "Fairy-Ground=1", "Fairy-Ice=1", "Fairy-Normal=1", "Fairy-Poison=0.5", "Fairy-Psychic=1", "Fairy-Rock=1", "Fairy-Steel=0.5", 
    "Fairy-Water=1", "Fighting-Bug=0.5", "Fighting-Dark=2", "Fighting-Dragon=1", "Fighting-Electric=1", "Fighting-Fairy=0.5", "Fighting-Fighting=1", "Fighting-Fire=1", 
    "Fighting-Flying=0.5", "Fighting-Ghost=0", "Fighting-Grass=1", "Fighting-Ground=1", "Fighting-Ice=2", "Fighting-Normal=2", "Fighting-Poison=0.5", "Fighting-Psychic=0.5", 
    "Fighting-Rock=2", "Fighting-Steel=2", "Fighting-Water=1", "Fire-Bug=2", "Fire-Dark=1", "Fire-Dragon=0.5", "Fire-Electric=1", "Fire-Fairy=1", "Fire-Fighting=1", 
    "Fire-Fire=0.5", "Fire-Flying=1", "Fire-Ghost=1", "Fire-Grass=2", "Fire-Ground=1", "Fire-Ice=2", "Fire-Normal=1", "Fire-Poison=1", "Fire-Psychic=1", "Fire-Rock=0.5", 
    "Fire-Steel=2", "Fire-Water=0.5", "Flying-Bug=2", "Flying-Dark=1", "Flying-Dragon=1", "Flying-Electric=0.5", "Flying-Fairy=1", "Flying-Fighting=2", "Flying-Fire=1", 
    "Flying-Flying=1", "Flying-Ghost=1", "Flying-Grass=2", "Flying-Ground=1", "Flying-Ice=1", "Flying-Normal=1", "Flying-Poison=1", "Flying-Psychic=1", "Flying-Rock=0.5", 
    "Flying-Steel=0.5", "Flying-Water=1", "Ghost-Bug=1", "Ghost-Dark=0.5", "Ghost-Dragon=1", "Ghost-Electric=1", "Ghost-Fairy=1", "Ghost-Fighting=1", "Ghost-Fire=1", 
    "Ghost-Flying=1", "Ghost-Ghost=2", "Ghost-Grass=1", "Ghost-Ground=1", "Ghost-Ice=1", "Ghost-Normal=0", "Ghost-Poison=1", "Ghost-Psychic=2", "Ghost-Rock=1", "Ghost-Steel=1", 
    "Ghost-Water=1", "Grass-Bug=0.5", "Grass-Dark=1", "Grass-Dragon=0.5", "Grass-Electric=1", "Grass-Fairy=1", "Grass-Fighting=1", "Grass-Fire=0.5", "Grass-Flying=0.5", 
    "Grass-Ghost=1", "Grass-Grass=0.5", "Grass-Ground=2", "Grass-Ice=1", "Grass-Normal=1", "Grass-Poison=0.5", "Grass-Psychic=1", "Grass-Rock=2", "Grass-Steel=0.5", 
    "Grass-Water=2", "Ground-Bug=0.5", "Ground-Dark=1", "Ground-Dragon=1", "Ground-Electric=2", "Ground-Fairy=1", "Ground-Fighting=1", "Ground-Fire=2", "Ground-Flying=0", 
    "Ground-Ghost=1", "Ground-Grass=0.5", "Ground-Ground=1", "Ground-Ice=1", "Ground-Normal=1", "Ground-Poison=2", "Ground-Psychic=1", "Ground-Rock=2", "Ground-Steel=2", 
    "Ground-Water=1", "Ice-Bug=1", "Ice-Dark=1", "Ice-Dragon=2", "Ice-Electric=1", "Ice-Fairy=1", "Ice-Fighting=1", "Ice-Fire=0.5", "Ice-Flying=2", "Ice-Ghost=1", 
    "Ice-Grass=2", "Ice-Ground=2", "Ice-Ice=0.5", "Ice-Normal=1", "Ice-Poison=1", "Ice-Psychic=1", "Ice-Rock=1", "Ice-Steel=0.5", "Ice-Water=0.5", "Normal-Bug=1", 
    "Normal-Dark=1", "Normal-Dragon=1", "Normal-Electric=1", "Normal-Fairy=1", "Normal-Fighting=1", "Normal-Fire=1", "Normal-Flying=1", "Normal-Ghost=0", "Normal-Grass=1",
    "Normal-Ground=1", "Normal-Ice=1", "Normal-Normal=1", "Normal-Poison=1", "Normal-Psychic=1", "Normal-Rock=0.5", "Normal-Steel=0.5", "Normal-Water=1", "Poison-Bug=1", 
    "Poison-Dark=1", "Poison-Dragon=1", "Poison-Electric=1", "Poison-Fairy=2", "Poison-Fighting=1", "Poison-Fire=1", "Poison-Flying=1", "Poison-Ghost=0.5", "Poison-Grass=2", 
    "Poison-Ground=0.5", "Poison-Ice=1", "Poison-Normal=1", "Poison-Poison=0.5", "Poison-Psychic=1", "Poison-Rock=0.5", "Poison-Steel=0", "Poison-Water=1", "Psychic-Bug=1", 
    "Psychic-Dark=0", "Psychic-Dragon=1", "Psychic-Electric=1", "Psychic-Fairy=1", "Psychic-Fighting=2", "Psychic-Fire=1", "Psychic-Flying=1", "Psychic-Ghost=1", "Psychic-Grass=1", 
    "Psychic-Ground=1", "Psychic-Ice=1", "Psychic-Normal=1", "Psychic-Poison=2", "Psychic-Psychic=0.5", "Psychic-Rock=1", "Psychic-Steel=0.5", "Psychic-Water=1", "Rock-Bug=2", 
    "Rock-Dark=1", "Rock-Dragon=1", "Rock-Electric=1", "Rock-Fairy=1", "Rock-Fighting=0.5", "Rock-Fire=2", "Rock-Flying=2", "Rock-Ghost=1", "Rock-Grass=1", "Rock-Ground=0.5", 
    "Rock-Ice=2", "Rock-Normal=1", "Rock-Poison=1", "Rock-Psychic=1", "Rock-Rock=1", "Rock-Steel=0.5", "Rock-Water=1", "Steel-Bug=1", "Steel-Dark=1", "Steel-Dragon=1", 
    "Steel-Electric=0.5", "Steel-Fairy=2", "Steel-Fighting=1", "Steel-Fire=0.5", "Steel-Flying=1", "Steel-Ghost=1", "Steel-Grass=1", "Steel-Ground=1", "Steel-Ice=2", "Steel-Normal=1", 
    "Steel-Poison=1", "Steel-Psychic=1", "Steel-Rock=2", "Steel-Steel=0.5", "Steel-Water=0.5", "Water-Bug=1", "Water-Dark=1", "Water-Dragon=0.5", "Water-Electric=1", "Water-Fairy=1", 
    "Water-Fighting=1", "Water-Fire=2", "Water-Flying=1", "Water-Ghost=1", "Water-Grass=0.5", "Water-Ground=2", "Water-Ice=1", "Water-Normal=1", "Water-Poison=1", "Water-Psychic=1", 
    "Water-Rock=2", "Water-Steel=1", "Water-Water=0.5"];
   
var order = null;
var offense = null;
var defense = null;
var answer = null;
var correct = 0;
var incorrect = 0;
var score = 100;
   
function next_matchup()
{
    idx += 1;
    
    if (idx >= data.length)
    {
        $("button").attr("disabled", "disabled");
        return false;
    }
    
    matchup = order[idx];
    var temp = matchup.split("=");
    var types = temp[0].split("-");
    offense = types[0];
    defense = types[1];
    answer = temp[1];
    
    //alert("OFFENSE " + offense + " DEFENSE " + defense + " ANSWER " + answer);
    var o = offense.toLowerCase();
    var d = defense.toLowerCase();
    $("#offense, #defense").removeClass();
    $("#offense").text(offense);
    $("#offense").addClass(o);
    $("#defense").text(defense);
    $("#defense").addClass(d);
    $("."+o+"-"+d).css("background", "#F85888");
}

function guess(val)
{
    $(".typechart").show();
    $("#instructions").hide();
    //alert("GUESS " + val + " ANSWER " + answer);
    if (idx >= data.length)
        return false;
    
    var o = offense.toLowerCase();
    var d = defense.toLowerCase();
    
    if (val == answer)
    {
        //alert("RIGHT" + "."+o+"-"+d);
        $("."+o+"-"+d).css("background", "#78C850");
        $("."+o+"-"+d).text(guess_to_char(val));
        
        $(".guess."+o+"-"+d).attr("colspan", "2");
        $(".answer."+o+"-"+d).css("display", "none");
        correct += 1;
    }
    else
    {
        //alert("WRONG");
        $("."+o+"-"+d).css("background", "#F05030");
        $("."+o+"-"+d).text(guess_to_char(val));
        $(".answer."+o+"-"+d).text(guess_to_char(answer));
        $(".answer."+o+"-"+d).css("border-left", "1px solid #000");
        incorrect += 1;
    }
    
    update_score();
    next_matchup();
}

function guess_to_char(val)
{
    if (val == 0)
        return "X";
    if (val == 0.5)
        return "½";
    else
        return val;
}

function update_score()
{
    $("#correct").text(correct);
    $("#incorrect").text(incorrect);
    $(".total").text(idx+1);
    
    score = parseInt((1.0 * correct / (idx+1)) * 100);
    $("#score").text(score);
}

//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/shuffle [v1.0]
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};
 
$(document).ready(function (){
    // Shuffle the data
    order = shuffle(data);
    
    next_matchup();
    $(".choice").removeProp("disabled");
    
    // Bind buttons
    $(".choice").click(function (){
        guess($(this).data("value"));
    });
    
    // Load keyboard shortcuts
    $(document).keyup(function (e){
        if (e.keyCode == 49)
            $("#super").click();
        if (e.keyCode == 50)
            $("#standard").click();
        if (e.keyCode == 51)
            $("#not").click();
        if (e.keyCode == 52)
            $("#immune").click();
    });
});