var scores;
var roundScore;
var activePlayer;
var diceNumber;
var  gamePlaying;

init();

document.querySelector(".btn-roll").addEventListener("click", function() {
    if( gamePlaying) {
            // 1. random number gengerate 1-6
            diceNumber = Math.floor(Math.random() * 6 ) + 1 ;

            // 2. Display the result
            document.querySelector(".dice").style.display = "block";
            document.querySelector(".dice").src = "image/dice-"+ diceNumber + ".png";

            if (diceNumber !== 1 ) {
                //  add score
                roundScore += diceNumber;
                document.querySelector("#current-" + activePlayer ).textContent = roundScore;
                console.log(diceNumber);
            } else {
                nextPlayer();
            }
    }
   
});

document.querySelector(".btn-hold").addEventListener("click", function() {
   if(gamePlaying){
        // add current score to global score
        scores[activePlayer] += roundScore;
        
        // update the UI
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
        //  check if the player won the game
        if(scores[activePlayer] >= 20) {
            document.querySelector("#name-" + activePlayer).textContent = "Winner!";
            document.querySelector(".dice").style.display = "none";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            gamePlaying = false;
        } else {
            nextPlayer();
        }
   }


});

function nextPlayer() {
    //  ternary operatior 
    activePlayer  === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    
    document.querySelector(".player-0-panel").classList.toggle('active');
    document.querySelector(".player-1-panel").classList.toggle('active');
    document.querySelector(".dice").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

function init () {
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying =true;
    
    document.querySelector(".dice").style.display = "none";
    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.querySelector("#name-0").textContent = "Player 1";
    document.querySelector("#name-1").textContent = "Player 2";
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");

}
