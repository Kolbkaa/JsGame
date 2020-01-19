let checkArray;
let timerId;
let score = 0;

document.getElementById("genBtn").addEventListener("click", reset);
document.getElementById("genBtn").addEventListener("click", generateGame);

function generateGame() {
    let number = getGameSize();

    if (number < 2 || number > 7) {
        return;
    }

    let array = shuffleArray(generateNumberArray(number));
    checkArray = generateNumberArray(number);
    let counter = 0;

    let gameDiv = createGameDiv();

    gameDiv.appendChild(createTimerElement());

    for (let i = 0; i < number; i++) {
        let rowDiv = document.createElement("div");
        for (let j = 0; j < number; j++) {
            let span = document.createElement("span");
            let button = createButtonElement(array[counter]);
            span.appendChild(button);
            rowDiv.appendChild(span);
            counter++;
        }

        gameDiv.appendChild(rowDiv);
    }

    addToMainDiv(gameDiv);

    timerId = timer(number);

}

function addToMainDiv(element) {
    let mainDiv = document.getElementById("main");
    mainDiv.appendChild(element);
}

function createGameDiv() {
    let gameDiv = document.createElement("div");
    gameDiv.id = "game";

    return gameDiv;
}

function getGameSize() {
    return document.getElementById("size").value;
}

function createButtonElement(value) {
    let button = document.createElement("button");
    button.innerText = value;
    button.style.width = '50px';
    button.style.height = '50px';
    button.addEventListener("click", checkCorrectValue);
    return button;
}

function createTimerElement() {
    let timerElement = document.createElement("div");
    timerElement.id = "timer";
    timerElement.className = "alert alert-info";
    return timerElement;
}

function generateNumberArray(number) {
    let array = [];
    for (let i = 0; i < number * number; i++) {
        array.push(i + 1);
    }
    return array;
}

function shuffleArray(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function checkCorrectValue(element) {
    if (checkArray.shift() == element.toElement.innerText) {
        if (checkArray.length == 0) {
            stopGame();
        }

    } else {
        stopGame();
    }
}

function createSuccessElement() {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode("Gratulacje!"));
    div.className = "alert alert-success";
    div.setAttribute("role", "alert");
    div.id = "game";
    return div;
}

function createFailElement() {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(`Niestety. Spróbuj jeszcze raz...`));
    div.className = "alert alert-danger";
    div.setAttribute("role", "alert");
    div.id = "game";
    return div;

}

function stopGame() {
    if (checkArray.length == 0) {
        deleteGameDiv();
        let successElement = createSuccessElement();
        addToMainDiv(successElement);
    } else {
        deleteGameDiv();
        let failElement = createFailElement();
        addToMainDiv(failElement);
    }
}

function displayTime(time) {
    let timeElement = document.getElementById("timer");
    if (timeElement !== null)
        timeElement.innerText = `Pozostały czas: ${time}`;

}

function timer(t) {

    let time = Math.floor((t * t) * 1.5);
    displayTime(time);

    let intervalId = setInterval(function () {

        time -= 1;

        displayTime(time);

        if (time <= 0) {
            clearInterval(intervalId);
            stopGame();
        }

    }, 1000);
    return intervalId;
}

function reset() {

    deleteGameDiv();
    clearInterval(timerId);
}

function deleteGameDiv() {
    let gameDiv = document.getElementById("game");
    if (gameDiv !== null) {
        gameDiv.parentElement.removeChild(gameDiv);
    }
}