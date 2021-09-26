//class of the card. This contains all the card is, and all that it can do.
class Card {
    //all the card is
    constructor(id, emoji, isVisible) {
        this.id = id;
        this.emoji = emoji;
        this.isVisible = isVisible;
        this.initCardContent(id, emoji);
    }
    initCardContent(id, emoji) {
        const cardTemplate = document.createElement("div");
        cardTemplate.classList = "col-4 col-md-4 col-lg-3 scene";
        cardTemplate.innerHTML = `
        <div class="card" data-emojiAttribute="${emoji}">
            <div class="card__face card__face--front">
                <div class="card__emoji">
                🙈
                </div>
            </div>
            <div class="card__face card__face--back">
                <div class="card__logo">
                ${emoji}
                </div>
            </div>
            </div>
            `;
        cardTemplate.addEventListener("click", function () {
            //create varibale for the card element
            const cardHTMLElement = cardTemplate.childNodes[1];
            flipCard(cardHTMLElement, emoji);
        });
        playingFieldElement.appendChild(cardTemplate);

    };
};