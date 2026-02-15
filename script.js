
const minTimeGeneration = 2;
const maxTimeGeneration = 5; 


const minTimeClose = 3;
const maxTimeClose = 7;

function getRandomTime (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function getAdvice() {
    const response = await fetch("https://api.adviceslip.com/advice");
    const data = await response.json();
    return data.slip.advice;


}

function createNotification(advice) {
    const card = document.createElement("div");
    card.classList.add("custom-card");

    const adviceText = document.createElement("p");
    adviceText.innerText = advice;
    card.appendChild(adviceText);

    const buttonClose = document.createElement("button");
    buttonClose.classList.add("button-close");
    buttonClose.innerText = "X";
    card.appendChild(buttonClose);


    const container = document.getElementById("section-advice");
    container.appendChild(card);

    buttonClose.addEventListener("click", () => {
        card.remove();
    });

    const timeClose = getRandomTime(minTimeClose, maxTimeClose);

    setTimeout(() => {
        card.remove();
    }, timeClose * 1000);

}

function generateCard() {
    getAdvice().then(advice => {
        createNotification(advice);

        const timeGenerateCard = getRandomTime(minTimeGeneration, maxTimeGeneration);
        setTimeout(generateCard, timeGenerateCard * 1000)
    });
}

generateCard();