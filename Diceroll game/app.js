/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying; //uvodimo potrebne varijable, kasnije ih definiramo - cleaner code

init();

var lastDice


//IMPLEMENTING THE ROLL DICE BUTTON FUNCTIONALITY

document.querySelector(".btn-roll").addEventListener("click", function() {
   //ne moramo nikakvu vrijednost za tu varijablu upisati jer je ona true/false varijabla
if(gamePlaying) {

//1. we need to get a random number first
var dice1 = Math.floor(Math.random() * 6) + 1; //uklonili smo var dice iz global objecta s pocetka vjezbe i stavili tu da pokazemo scoping chain.
var dice2 = Math.floor(Math.random() * 6) + 1;

//2. we need to display the result
document.getElementById("dice-1").style.display = "block"; //ubacili smo ovu varijablu unutar ovog skopa gdje izjednacavamo ju s querySelectorom da ne moramo dalje u kodu stalno pisati querySelector linije
document.getElementById("dice-2").style.display = "block"; //ubacili smo ovu varijablu unutar ovog skopa gdje izjednacavamo ju s querySelectorom da ne moramo dalje u kodu stalno pisati querySelector linije
document.getElementById("dice-1").src = "dice-" + dice1 + ".png";
document.getElementById("dice-2").src = "dice-" + dice2 + ".png";


//3. Update the round score IF the rolled number was not a 1.
if  (dice1 !== 1 && dice2 !== 1) {   //this equality operator doesn't do type coercion, != does, mogli smo i zapisat kao dice > 1
//add score
roundScore = roundScore + dice1 + dice2; //(roundScore = roundScore + dice)
document.querySelector("#current-" + activePlayer).textContent = roundScore;
} else {
  //next player
  nextPlayer();
  }


}
});



// IMPLEMENTING HOLD BUTTON FUNCTIONALITY

document.querySelector(".btn-hold").addEventListener("click", function() {
if(gamePlaying) {
  // Add CURRENT score to GLOBAL scores
scores[activePlayer] += roundScore;
//scores[activePlayer] = scores[activePlayer] + roundScore

  //Update the UI
document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer]

var input = document.querySelector('.final-score').value;
console.log(input);
var winningScore;

// Undefined, 0, null or "" are COERCED to false
// Anything else is coerced to true
if (input) {
  winningScore = input;
} else {
  winningScore = 100;
}


  //Check if player won the game
if (scores[activePlayer] >= winningScore) {
  document.querySelector("#name-" + activePlayer).textContent = "Winner!"
  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";
  document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");   // ne pišeš to kao ".winner" jer se vec zna po "classList" komandi da se referiras na klasu
  document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
  gamePlaying = false;
} else {
  //Next player
  nextPlayer()
    }
}
});

//UPDATING SCORES AND CHANGING THE ACTIVE PLAYER - ternary operator, how to add, remove and toggle html classes

//IMPLEMENTING THE "HOLD" FUNCTION AND OUR D.R.Y. PRINCIPLE -

//Ovo je prije bila anonimna funkcija, ali kako moramo "next player" switch koristiti i za hold button i za roll dice, eksternalizirali smo je da ju možemo pozvat unutar obje bez da dvaput pisemo isti kod
function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; //if active player === 0 THEN (?) activePlayer = 1 ELSE (:) activePlayer = 0
  roundScore = 0; // we're resetting the score to 0 when we change player here
  document.getElementById("current-0").textContent = "0"; // it also resets the score visually to 0
  document.getElementById("current-1").textContent = "0";

  // document.querySelector(".player-0-panel").classList.remove("active"); // the active class will get remove from the html ELEMENT
  // document.querySelector(".player-1-panel").classList.add("active");
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";
  }





// IMPLEMENTING THE NEW GAME BTN FUNCTIONALITY

/*
document.querySelector(".btn-new").addEventListener("click", function() {

scores = [0, 0]; //first we reset the scores
activePlayer = 0 // back to first player
roundScore = 0




});
*/   //nećemo ovo jer to goes against D.R.Y. principle pa ćemo zapravo one varijable s početka uvesti u init()  (initialize function) koji cemo onda pozvati na samom početku .js-a

document.querySelector(".btn-new").addEventListener("click", init); //naredjujemo EventListeneru da aktivira funkciju kad stisnemo dugme, ne aktiviramo ju mi (callback), da smo ju napisali sa zagradom, odmah bismo je aktivirali


function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;
  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";

  document.getElementById('score-0').textContent = "0"
  document.getElementById('score-1').textContent = "0"
  document.getElementById('current-0').textContent = "0"
  document.getElementById('current-0').textContent = "0"

  document.getElementById("name-0").textContent = "Player 1" //na ova dva nacina mozemo zapisati, primjeti da ti za id  u query selectoru TREBA #, ovdje ga ne pises
  document.querySelector("#name-1").textContent = "Player 2"    //ovim dvama komandama resetamo WINNER! text ako je ostao od prosle runde

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");

  document.querySelector(".player-0-panel").classList.add("active"); //ukloni active class iz prosle igre i odmah ubaci active za novu
};




/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/
