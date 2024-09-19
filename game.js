var arr=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;

$("#level-title").on("click",function() {
    if(!started) {
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
    });

$(document).on("keypress",function(event) {
    if(!started) {
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
    });


$(".btn").on("click",function() {
var userChosenColor=$(this).attr("id");
userClickedPattern.push(userChosenColor);
playSound(userChosenColor);
animatePress(userChosenColor);
checkAnswer(userClickedPattern.length-1);
});



function checkAnswer(currentLevel) {
if(gamePattern[currentLevel]==userClickedPattern[currentLevel]) {
    console.log("Success");
if(userClickedPattern.length==gamePattern.length) {
setTimeout(function() {
    nextSequence();
},1000);
}
}
else {
    console.log("Wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over , Press any key to Restart");

    setTimeout(function() {
        $("body").removeClass("game-over");},200);
        startOver();
}
}

function startOver()  {
    level=0;
    gamePattern=[];
    started=false;
}




function nextSequence() {
    level++;
    userClickedPattern=[];
    $("#level-title").text("Level "+level);
    var ran=Math.floor(Math.random()*4);
    var ranColor=arr[ran];
    gamePattern.push(ranColor);
    
    $("#"+ranColor).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(ranColor);

}

function playSound(name)  {
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor) {
$("#"+currentColor).addClass("pressed");

setTimeout(function() {
    $("#"+currentColor).removeClass("pressed");
},100);
}

