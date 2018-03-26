// identify cards array
let card = document.getElementsByClassName("card");
let cards = [...card];

// identify deck for all cards
const deck = document.getElementById("deck");

// identify move variable
let moves = 0;
let counter = document.querySelector(".moves");

// identify variables for star icons
const stars = document.querySelectorAll(".fa-star");
// identify stars list
let starsList = document.querySelectorAll(".stars li");

// identify variable of matchedCards
let matchedCard = document.getElementsByClassName("match");

// identify close icon in game
 let closeicon = document.querySelector(".close");

// identify main game class
 let game = document.getElementById("popup1");

// identify array for opened cards
let openedCards = [];

/**********************************************************
            End of identifing Variables and
            Start identifing Functions
**********************************************************/

// Run start game function to remove all classes and shuffle all cards
document.body.onload = startGame();

// Function to start play or when the game restart
function startGame(){
    // shuffle cards
    cards = shuffle(cards);
    // remove all exisiting classes from each card
    for (var i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        deck.classList.add("animated", "flip");
        cards[i].classList.remove("show", "open", "match", "disabled", "animated", "flip");
    }
    // reset moves
    moves = 0;
    counter.innerHTML = moves;
    // reset stars rating
    for (var i= 0; i < stars.length; i++){
        stars[i].style.color = "#FFD700";
        stars[i].style.visibility = "visible";
    }
    //reset timer
    second = 0;
    minute = 0;
    hour = 0;
    let timer = document.querySelector(".timer");
    timer.innerHTML = minute+" mins "+second+" secs ";
    clearInterval(interval);
};


// Object to toggles open and show class to display cards
const displayCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};

// loop to add event listeners to each card
for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    //card.addEventListener("click",congratulations);
};

// Function to add opened cards to OpenedCards list and check if cards are match or not
function cardOpen() {
    openedCards.push(this);
    let OpenCardsLength = openedCards.length;

    // Check if user opened to cards to proceed
    if(OpenCardsLength === 2){
        moveCounter();
        deck.classList.remove("animated", "flip");
        // Check if the two cards are matched or not
        if(openedCards[0].type === openedCards[1].type){
            matched();
        } else {
            unmatched();
        }
    }
};


// Function to run when cards match
function matched(){
    openedCards[0].classList.add("match", "disabled", "animated", "flip");
    openedCards[0].classList.remove("show", "open", "no-event");
    openedCards[1].classList.add("match", "disabled", "animated", "flip");
    openedCards[1].classList.remove("show", "open", "no-event");
    openedCards = [];
}


// Function to run when cards not matched
function unmatched(){
    openedCards[0].classList.add("animated","wobble","unmatched");
    openedCards[1].classList.add("animated","wobble","unmatched");
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove("animated","wobble","show", "open", "no-event","unmatched");
        openedCards[1].classList.remove("animated","wobble","show", "open", "no-event","unmatched");
        enable();
        openedCards = [];
    },1500);
}


// This function to disable cards temporarily
function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}

// Function to enable cards and disable matched cards
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        // For loop to disable all matched cards
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}


// Function to calculate Game Time
var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+" mins "+second+" secs ";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}


// Function to calculate moves
function moveCounter(){
    moves++;
    counter.innerHTML = moves;
    //start timer on first click
    if(moves == 1){
        second = 1;
        startTimer();
    }
    // setting rates based on moves
    if (moves > 6 && moves < 14){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 16){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }
}


// Function to close icon on game
function closeGame(){
    closeicon.addEventListener("click", function(e){
        game.classList.remove("show");
        startGame();
    });
}


// Function for user to play Again
function playAgain(){
    game.classList.remove("show");
    startGame();
}



/*
 * set up the event listener for a card. If a card is clicked:
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
