//defining my variables i will be using
let playerText = document.getElementById("status");
let restartBtn = document.getElementById("restart");
let boxes = Array.from(document.getElementsByClassName("box"));

let winnerIndicator = getComputedStyle(document.body).getPropertyValue(
  "--winning-blocks"
);
// making the x and o for the user to put into the boxes and to make the boxes empty so a player cant put their marker over another players
const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);

const startGame = () => {
  boxes.forEach((box) => box.addEventListener("click", boxClicked));
};
// Here is where i start my conditions for winning, losing and if its a tie.
function checkForTie() {
  return spaces.every((space) => space !== null);
}

function boxClicked(e) {
  const id = e.target.id;

  if (!spaces[id]) {
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;

    if (playerHasWon() !== false) {
      playerText.innerHTML = `${currentPlayer} has won!`;
      let winning_blocks = playerHasWon();

      winning_blocks.map(
        (box) => (boxes[box].style.backgroundColor = winnerIndicator)
      );
      return;
    }

    if (checkForTie()) {
      playerText.innerHTML = `It's a tie!`;
      return;
    }

    currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
    playerText.innerHTML = `It is ${currentPlayer}'s Turn`;
  }
}
// here is my array for the winning combos possible for someone to win
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function playerHasWon() {
  for (const condition of winningCombos) {
    let [a, b, c] = condition;

    if (spaces[a] && spaces[a] == spaces[b] && spaces[a] == spaces[c]) {
      return [a, b, c];
    }
  }
  return false;
}
// giving my restart button an event listener so it can restart the game on a click
restartBtn.addEventListener("click", restart);

function restart() {
  spaces.fill(null);

  boxes.forEach((box) => {
    box.innerText = "";
    box.style.backgroundColor = "";
  });
  //This is my text that is going to be visible to the players
  playerText.innerHTML = `It is ${currentPlayer}'s Turn`;

  currentPlayer = X_TEXT;
}

startGame();
