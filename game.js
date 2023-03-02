// array that stores the color of each button
const buttonColors = ["red", "blue", "green", "yellow"];

// empty arrays for game pattern and user clicked pattern
var gamePattern = [];
var userClickedPattern = [];

//variable to track current level 
var level = 0;

//boolean value for first keydown to start game
var started = false;

function nextSequence(){
    // Generates a random number between 0 & 4 and assigns random num to buttonColors array
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];

    //performs flash animation on the ID of color chosen
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

    //adds the random chosen color that was generated to the end of gamePattern array
    gamePattern.push(randomChosenColor);

    //plays the sound of random chosen color
    playSound(randomChosenColor);
    
    //level is incremented when nextSequence function is called and h1 is changed
    level++;
    $("h1").text("Level " + (level));
}

$(document).on("keydown",function(){
    //on the event of keydown if started is equal to false call nextSequence
    if (started === false){
        nextSequence();
        started = true;
    }
});

$(".btn").on("click",function(event){
    
    //variable that stores the ID of the button that was clicked
    var userChosenColor = (event.target.id);  
    
    //add user chosen color to the end of user clicked pattern array
    userClickedPattern.push(userChosenColor);

    //plays sound and animate the press of user chosen color
    playSound(userChosenColor);
    animatePress(userChosenColor); 

    //this was the missing piece of the puzzle
    // figuring out how to allow the user to guess their total amount of clicks
    // before the check answer function is called
    if (userClickedPattern.length == gamePattern.length){
        checkAnswer();
    }
            
});

function animatePress(currentColor){
    //adds css class of pressed
    $("#" + currentColor).addClass("pressed"); 
    // after 100 milliseconds remove css class of pressed
    setTimeout(function(){      
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

//function to play the sound of color passed into function
function playSound(color){

    switch(color){
        case "red":
            var red_sound = new Audio("sounds/red.mp3");
            red_sound.play();
        break;
    
        case "blue":
            var blue_sound = new Audio("sounds/blue.mp3");
            blue_sound.play();
        break;
    
        case "green":
            var green_sound = new Audio("sounds/green.mp3");
            green_sound.play();
        break;
    
        case "yellow":
            var yellow_sound = new Audio("sounds/yellow.mp3");
            yellow_sound.play();
        break;
    }
}
//function to check answers, this gave me so much trouble
//displays game over when user guesses wrong
function checkAnswer(){

    for (i = 0; i < gamePattern.length; i++){

        if (gamePattern[i] !== userClickedPattern[i]){
            
            var errorSound = new Audio("sounds/wrong.mp3");
            errorSound.play();

            $("body").addClass("game-over"); 
            // after 200 milliseconds remove css class of game over
            setTimeout(function(){      
                $("body").removeClass("game-over");
            }, 200);

            //change h1 to game over prompt
            $("h1").text("Game Over, Press Any Key to Restart");
            startOver();
            throw console.error();

        } 
}

    //figuring out after check answer function is called and each element of game pattern and user pattern are equal
    // to empty all elements in user array to allow user to guess from the beginning 
userClickedPattern = [];

    // after 1000 milliseconds call next Sequence function
    setTimeout(function(){      
        nextSequence();
    }, 1000);
    
}

function startOver(){ // work on this
    started = false;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}





