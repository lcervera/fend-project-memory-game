/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

var count = 0;
var openCards = [];

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

function handleOnClick() {

    if ($(this).hasClass("open") || $(this).hasClass("match") || openCards.length == 2) {
        return;
    }

    displayCard(this);
    addCardToList(this);
    checkIfCompleted();

}

function checkIfCompleted() {
    if ($(".match").length === 16) {
        setTimeout(() => { alert("You won!") }, 1000);
    }
}

function checkRating() {
    if (count == 15 || count == 20 || count == 25) {
        $(".fa-star").last().removeClass('fa-star').addClass('fa-star-o');
    }
}

function increaseCouter() {
    count++;
    $(".moves").html(count);
}

function displayCard(card) {
    $(card).addClass("open");
}

function addCardToList(card) {
    openCards.push(card);
    if (openCards.length == 2) {
        increaseCouter();
        cardsMatch();
        checkRating();
    }
}

function cardsMatch() {

    if ($(openCards[0]).attr('data') === $(openCards[1]).attr('data')) {
        $(".open").addClass("match");
    }

    closeOpenCards();

}

function closeOpenCards() {

    setTimeout(() => {
        openCards = [];
        $(".open").removeClass("open");
    }, 1000);

}

function createCard(icon) {
    return '<li class="card" data="' + icon + '" > <div class="front"></div><div class="back"><i class="fa ' + icon + '"></i></div></li>'
}

function handleRestart() {
    $(".card").remove();
    drawCards();
    count = 0;
    $(".moves").html(count);
    $(".fa-star-o").removeClass('fa-star-o').addClass('fa-star');
}

function drawCards() {

    var arrayCards = [
        'fa-diamond', 'fa-diamond',
        'fa-beer', 'fa-beer',
        'fa-snowflake-o', 'fa-snowflake-o',
        'fa-bomb', 'fa-bomb',
        'fa-bullseye', 'fa-bullseye',
        'fa-flag', 'fa-flag',
        'fa-hourglass', 'fa-hourglass',
        'fa-trophy', 'fa-trophy'
    ];

    var shuffledCards = shuffle(arrayCards);

    shuffledCards.forEach((icon) => {
        $(".deck").append(createCard(icon));
    });

    $(".card").click(handleOnClick);

}

function init() {
    drawCards();
    $(".restart").click(handleRestart);
}

$(document).ready(init);


/*}
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
