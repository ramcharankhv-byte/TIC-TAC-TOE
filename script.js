let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#newbtn");
let msgContianer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnX = true; // true means X's turn, false means O's turn
let count = 0;
let starter = true; // To Track Draw
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
    msgContianer.classList.remove("hide");
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
      // Flip for the next round
    nextStartO = !nextStartO;
    // Determine who starts this round based on nextStartO
    turnX = !nextStartO; // if nextStartO = false → X starts, if true → O starts
    count = 0;
    enableBoxes();
    msgContianer.classList.add("hide");
    starter = turnX;
    // Update turn indicator
    if (turnX) {
        turnIndicator.innerText = "X's Turn";
    } else {
        turnIndicator.innerText = "O's Turn";
    }
    
  
};

const resetRound = () =>{
    enableBoxes();
    turnX = starter;
    count = 0;
}


boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnX) {
            box.innerText = "X";
            turnIndicator.innerText = "O's Turn";
            turnX = false;
        } else {
            box.innerText = "O";
            turnIndicator.innerText = "X's Turn";
            turnX = true;
        }

        box.disabled = true;
        count++;

        let iswinner = checkWinner();

        if (count === 9 && iswinner === false) {
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContianer.classList.remove("hide");
    disableBoxes();

    const nextStarter = nextStartO ? "O" : "X";
    msg.innerText += `\nNext round starts with ${nextStarter}.`;
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
    starter = turnX;
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let posval1 = boxes[pattern[0]].innerText;
        let posval2 = boxes[pattern[1]].innerText;
        let posval3 = boxes[pattern[2]].innerText;

        if (posval1 !== "" && posval2 !== "" && posval3 !== "") {
            if (posval1 === posval2 && posval2 === posval3) {
                showWinner(posval1);
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
    turnX=true;
    nextStartO=false;
    turnIndicator.innerText = "X's Turn";
    score1Display.innerText = score1;
    score2Display.innerText = score2;
});

newGameBtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetRound);
