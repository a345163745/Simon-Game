const buttonColors = ["red","blue","green","yellow"];

let gamePattern = [];
let userClickedPattern = [];
let start = false;
let level = 0;

$(document).keydown(()=>{
    if(!start){
        $("#level-title").text("level "+ level);
        nextSequence();
        start = true;
    }
})

$(".btn").on("click",function(){
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
   animatePress(userChosenColor)
    makeSound(userChosenColor)
    checkAnswer(userClickedPattern.length-1)
})

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(()=>{
                nextSequence();
            },1000)
        }
    }else{
        console.log("wrong")
        makeSound("wrong")
        $("body").addClass("game-over");
        setTimeout(()=>{
            $("body").removeClass("game-over");
        },200);

        $("h1").text("Game Over, Press Any Key to Restart");
       startOver();
    }
}

function startOver(){
    gamePattern = [];
    start=false;
    level = 0;
}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("level "+ level);
    const randomNumber = Math.floor(Math.random()*4); //random number 0 - 3
    let randomChosenColor = buttonColors[randomNumber];
    $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100);
    gamePattern.push(randomChosenColor);
    makeSound(randomChosenColor);
}




function makeSound(color){
    let colorSound = new Audio(`./sounds/${color}.mp3`);
     colorSound.play();
}

function animatePress(currentColor){
$("#"+currentColor).addClass("pressed")
setTimeout(()=>{
    $("#"+currentColor).removeClass("pressed")
},100)
}
