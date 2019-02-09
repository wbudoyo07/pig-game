var scores;
var roundScore;
var activePlayer;
var diceNumber;
var gamePlaying;
var lastDice;
init();

document.querySelector(".btn-roll").addEventListener("click", function() {
    if( gamePlaying) {
            // 1. random number gengerate 1-6
            var diceNumber1 = Math.floor(Math.random() * 6 ) + 1 ;
            var diceNumber2 = Math.floor(Math.random() * 6 ) + 1 ;

            // 2. Display the result
            document.getElementById("dice-1").style.display = "block";
            document.getElementById("dice-2").style.display = "block";
            document.getElementById("dice").src = "image/dice-"+ diceNumber1 + ".png";
            document.getElementById("dice").src = "image/dice-"+ diceNumber2 + ".png";

            if(diceNumber === 6 && lastDice === 6) {
                // player lose score
                scores[activePlayer] = 0;
                document.querySelector("#score-" + activePlayer).textContent = 0;
                nextPlayer();
            }  else if (diceNumber !== 1 ) {
                //  add score
                roundScore += diceNumber;
                document.querySelector("#current-" + activePlayer ).textContent = roundScore;
                console.log(diceNumber);
            } else {
                nextPlayer();
            }

            lastDice = dice;
    }
   
});

document.querySelector(".btn-hold").addEventListener("click", function() {
   if(gamePlaying){
        // add current score to global score
        scores[activePlayer] += roundScore;
        
        // update the UI
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
    
        var input = document.querySelector(".final-score").value;
        var winningScore;
        // undefined, 0, null, or "" are CORCED to false
        // anything else is COERCED to true
        if(input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }
       
        //  check if the player won the game
        if(scores[activePlayer] >= winningScore ) {
            document.querySelector("#name-" + activePlayer).textContent = "Winner!";
            document.getElementById("dice-1").style.display = "none";
            document.getElementById("dice-2").style.display = "none";            
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
    document.getElementById("dice-1").style.display = "none";
    document.getElementById("dice-2").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

function init () {
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying =true;

    document.getElementById("dice-1").style.display = "none";
    document.getElementById("dice-2").style.display = "none";
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
