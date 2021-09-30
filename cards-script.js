
// ----- Objects ------------------------------------------------------------------------------------------------------------------

//Emoji theme objects
const themeOne = {
    name: "🤡 Carnaval",
    emojiArray: ['🍺', '💰', '🤡', '🎡', '🎢', '🎟']
};

const themeTwo = {
    name: "🏖 Tropical",
    emojiArray: ['🐠', '🍍', '🌺', '🌞', '🍹', '🌴']
};

const themeThree = {
    name: "🧤 Winter",
    emojiArray: [' ❄️', '⛄️', '🥌', '🧤', '🥶', '🧣']
};

// ----- Variables ------------------------------------------------------------------------------------------------------------------

//emojiArray, emojiArrayDuplicate are the arrays that will be used to generate the cards with
let emojiArray;
let emojiArrayDuplicate;
//the emojiArray after it will be shuffled will be saved in this array
let shuffledemojiArrayDuplicate;

//delay time
const delayInMilliseconds = 1500;

//card 
let card;
let cardArray = [];
let openCardsArray = [];

let idNumber = 0;
let emojiNumber = 0;
let isVisible = false;
let foundCards = 0;
let totalCards;

// ----- HTML elements ------------------------------------------------------------------------------------------------------------------

// Memory and card elements
const gameContentElement = document.getElementById("game__content");
const playingFieldElement = document.getElementById("playing-field");
const cardElements = document.getElementsByClassName("card");
const flippedCardElement = document.getElementsByClassName("is-flipped");
const isPairElement = document.getElementsByClassName("is-pair");

//Game intro elements
const themeButton = document.getElementsByClassName("theme-button");
const gameDetailsElement = document.getElementById("game__details");
const gameEndElement = document.getElementById("game__end");
const gameResetButton = document.querySelectorAll("reset-button");

//Game info elements
const foundCardsElement = document.getElementById("found-cards");
const totalCardsElement = document.getElementById("total-cards");


// ----- Event listeners------------------------------------------------------------------------------------------------------------------

//for each of reset game buttons reload the page
for (var i = 0; i < gameResetButton.length; i++) {
    gameResetButton[i].addEventListener('click', function (e) {
        location.reload();
    });
};

//for each of the theme buttons, create an event listener
//and set the emoji array based on the button that is clicked
for (var i = 0; i < themeButton.length; i++) {
    themeButton[i].addEventListener('click', function (e) {
        e.preventDefault();

        //using the html data attribite to set the emojiarray that will be used for the cards
        //expression that we are going to check
        switch (this.dataset.theme) {
            //if the expression is equal to 0, then..
            case '0':
                emojiArray = themeOne.emojiArray;
                break;
            case '1':
                emojiArray = themeTwo.emojiArray;
                break;
            case '2':
                emojiArray = themeThree.emojiArray;
                break;
        }

        //hide the game details element
        gameDetailsElement.classList.add('no-display');

        //start a new game
        startNewGame();
    });
};

// ----- Functions ------------------------------------------------------------------------------------------------------------------

//create the cards
function createCards() {
    //if if the emojinumber that are counted are smaller than the lenght of the emojiarrayDuplicate
    if (emojiNumber < shuffledemojiArrayDuplicate.length) {
        //give the data to the card class that it needs to use to create the card
        card = new Card(idNumber, shuffledemojiArrayDuplicate[emojiNumber], isVisible);
        cardArray.push(card);
        //+1 for the id number for the next card
        idNumber++;
        emojiNumber++;
    }
}

//shuffles the order of the emoji's
function shuffle(sourceArray) {
    for (let i = 0; i < sourceArray.length - 1; i++) {
        let j = i + Math.floor(Math.random() * (sourceArray.length - i));

        let temp = sourceArray[j];
        sourceArray[j] = sourceArray[i];
        sourceArray[i] = temp;
    }
    return sourceArray;
};

function startNewGame() {
    //with the chosen emoji array create an array including duplicates
    emojiArrayDuplicate = emojiArray.concat(emojiArray);
    //create an shuffled array that contains the emojis
    shuffledemojiArrayDuplicate = shuffle(emojiArrayDuplicate);

    //set the total cards based on the amount of emojis and set it in the inner html
    totalCards = shuffledemojiArrayDuplicate.length;
    totalCardsElement.innerHTML = totalCards;

    // For each emoji in the emojiArrayDuplicate create a card
    shuffledemojiArrayDuplicate.forEach(element => {
        createCards();
    });

    //show the game content element
    gameContentElement.classList.remove('no-display');
};


//flips the card and freezes all other cards so that they are not clickable during the time the two cards are visible
function flipCard(cardHTMLElement, emoji) {
    cardHTMLElement.classList.toggle("is-flipped");
    cardHTMLElement.classList.add('freeze');
    //push the emoji to the array
    openCardsArray.push(emoji);
    //check the amount of open cards based on the amount of items in the openCardsArray
    checkAmountOfOpenCards(openCardsArray);
};

//if there there is one card open, add it to cardA
function checkAmountOfOpenCards() {
    //cardA and cardB are used to compare the two values
    let cardA;
    let cardB;

    //if there is more than one cards open    
    if (openCardsArray.length > 1) {

        // freeze all other cards
        freezeCards();
        //set cardB so that it can be compared to cardA
        cardB = flippedCardElement;
        //set a delay so that the cards don't turn instantly after the second card is clicked
        setTimeout(function () {
            //check if the two cards are a pair
            checkifPair();
            //close all cards
            closeAllCards();
            //clear the openCardsArray
            openCardsArray.splice(0, openCardsArray.length);
            //make the cards clickable again
            unFreezeCards();
        }, delayInMilliseconds);
    } else {
        //set cardA so that it can be compared to cardB when the second card is clicked
        cardA = flippedCardElement;
    }
};


function checkifPair() {
    // if the first emoji in the cardArray is the same as the second one in the array
    if (openCardsArray[0] === openCardsArray[1]) {
        //add the class is-pair so that we can hide the cards
        flippedCardElement[0].classList.add("is-pair");
        flippedCardElement[1].classList.add("is-pair");
        hidePair();
    } else {
        //if it's not a pair close all the cards and continue
        closeAllCards();
        return;
    };

    // if all the cards are found hide the game content element and how the game end element
    if (foundCards === totalCards) {
        gameContentElement.classList.add('no-display');
        gameEndElement.classList.remove('no-display');
    }
};

function freezeCards() {
    //add the freeze class to all the cards so that they can't be clicked
    for (let i = 0; i < cardElements.length; i++) {
        cardElements[i].classList.add('freeze');
    }
};

function unFreezeCards() {
    //remove the freeze class to all the cards so that they can be clicked
    for (let i = 0; i < cardElements.length; i++) {
        cardElements[i].classList.remove('freeze');
    }
}


function hidePair() {
    //add the class hidden tot the isPair elements
    isPairElement[0].classList.add("hidden");
    isPairElement[1].classList.add("hidden");

    //count the added cards to the found cards
    foundCards = foundCards + 2;
    //update it in the html
    foundCardsElement.innerHTML = foundCards;

    //loop that removes is-pair class for all the isPairElements
    while (isPairElement.length) {
        isPairElement[0].classList.remove("is-pair");
    };
};

//close all the cards
function closeAllCards() {
    //check all the flipped elements and remove the is-flipped
    while (flippedCardElement.length)
        flippedCardElement[0].classList.remove('is-flipped');
};


function setDetails() {
    gameContentElement.classList.add('no-display');
    gameEndElement.classList.add('no-display');
    themeButton[0].innerHTML = themeOne.name;
    themeButton[1].innerHTML = themeTwo.name;
    themeButton[2].innerHTML = themeThree.name;
};

//when the document is ready, hide the content and end element
document.addEventListener("DOMContentLoaded", function () {
    setDetails();
});