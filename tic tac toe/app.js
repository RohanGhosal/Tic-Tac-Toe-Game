// Accessing elements using query selectors
let boxes = document.querySelectorAll(".box");
let restartBtn = document.querySelector(".rst-game");
let newGamebtn = document.querySelector(".new-game");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

// Deciding alternate turns for players
let turnX = true;

// Assigning winning patterns
const winpatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Resetting the game
const resetGame = () => {
    turnX = true;
    enableBtns();
    msgContainer.classList.add("hide");
};

// Adding click event to boxes
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText !== "") return; // Prevent overwriting an already filled box

        if (turnX) {
            box.innerText = "X";
            turnX = false;
        } else {
            box.innerText = "O";
            turnX = true;
        }

        box.disabled = true; // Each box can be clicked only once

        checkWinner();
        if (!checkWinner() && isDraw()) {
            drawFunction();
        }
    });
});

// Disabling all buttons/boxes
const disableBtns = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
    msgContainer.classList.remove("hide");
};

// Enabling all buttons/boxes
const enableBtns = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
    msgContainer.classList.add("hide");
};

// Handling draw condition
const drawFunction = () => {
    disableBtns();
    msg.innerHTML = "Oops!    It's a Draw";
    msgContainer.classList.remove("hide");
};

// Showing the winner
const showWinner = (winner) => {
    msg.innerText = `Congratulations, the winner is ${winner}!`;
    msgContainer.classList.remove("hide");
    disableBtns();
};

// Checking for a winner
const checkWinner = () => {
    for (let pattern of winpatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                showWinner(pos1val);
                return true; // Winner found
            }
        }
    }
    return false; // No winner
};

// Checking for a draw
const isDraw = () => {
    return Array.from(boxes).every((box) => box.innerText !== "");
};

// Adding event listeners to reset buttons
newGamebtn.addEventListener("click", resetGame);
restartBtn.addEventListener("click", resetGame);
