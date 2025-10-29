let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#newbtn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnX = true; // true means X's turn, false means O's turn
let count = 0;
let starter = true; // who started this round
let score1 = 0;
let score2 = 0;

const score1Display = document.querySelector("#score1");
const score2Display = document.querySelector("#score2");

const landingPage = document.querySelector(".landing-page");
const gameMain = document.querySelector("main");
const proceedBtn = document.querySelector("#proceedBtn");

proceedBtn.addEventListener("click", () => {
    landingPage.classList.add("hide");
    gameMain.classList.remove("hide");
});

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
];

let turnIndicator = document.querySelector("#turn");
let nextStartO = false; // false = X starts, true = O starts

const showWinner = (winner) => {
    msg.innerText = `Player ${winner} Wins!`;
    msgContainer.classList.remove("hide");
    disableBoxes();

    if (winner === "X") {
        score1++;
        score1Display.innerText = score1;
    } else {
        score2++;
        score2Display.innerText = score2;
    }
};

const resetGame = () => {
    // Alternate starting player
    nextStartO = !nextStartO;
    turnX = !nextStartO; // if nextStartO = false → X starts, else O starts
    starter = turnX; // remember who started this round
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");

    turnIndicator.innerText = turnX ? "X's Turn" : "O's Turn";
};

const resetRound = () => {
    enableBoxes();
    turnX = starter; // restore who started this round
    count = 0;
    msgContainer.classList.add("hide");

    turnIndicator.innerText = turnX ? "X's Turn" : "O's Turn";
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnX) {
            box.innerText = "X";
            turnIndicator.innerText = "O's Turn";
        } else {
            box.innerText = "O";
            turnIndicator.innerText = "X's Turn";
        }

        box.disabled = true;
        turnX = !turnX;
        count++;

        let isWinner = checkWinner();
        if (count === 9 && isWinner === false) {
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes = () => {
    boxes.forEach((box) => (box.disabled = true));
};

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1);
                return true;
            }
        }
    }
    return false;
};

let resetScoresBtn = document.querySelector("#resetScores");

resetScoresBtn.addEventListener("click", () => {
    score1 = 0;
    score2 = 0;
    turnX = true;
    nextStartO = false;
    starter = true;
    turnIndicator.innerText = "X's Turn";
    enableBoxes();
    score1Display.innerText = score1;
    score2Display.innerText = score2;
    msgContainer.classList.add("hide");
});

newGameBtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetRound);
