let gameBoard = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function createPlayer(name, mark) {
  return { name, mark };
}

const playerX = createPlayer("playerX", "X");
const playerO = createPlayer("playerO", "O");
function displayBoard() {
  return `
  ${gameBoard[0]} | ${gameBoard[1]} | ${gameBoard[2]}
  ${gameBoard[3]} | ${gameBoard[4]} | ${gameBoard[5]}
  ${gameBoard[6]} | ${gameBoard[7]} | ${gameBoard[8]}
  `;
}
function updateBoard(position, mark) {
  gameBoard[position - 1] = mark;
}

function checkWin(arr) {
  if (
    (arr[0] === arr[1] && arr[1] === arr[2]) || // 1 2 3
    (arr[3] === arr[4] && arr[4] === arr[5]) || // 4 5 6
    (arr[6] === arr[7] && arr[7] === arr[8]) || // 7 8 9
    (arr[0] === arr[3] && arr[3] === arr[6]) || // 1 4 7
    (arr[1] === arr[4] && arr[4] === arr[7]) || // 2 5 8
    (arr[2] === arr[5] && arr[5] === arr[8]) || // 3 6 9
    (arr[0] === arr[4] && arr[4] === arr[8]) || // 1 5 9
    (arr[2] === arr[4] && arr[4] === arr[6]) // 3 5 7
  ) {
    return true;
  }
}

function checkTie(arr) {
  // Check if every position is either "X" or "O"
  return arr.every((cell) => cell === "X" || cell === "O");
}

function gameControl(player1, player2) {
  console.log(displayBoard(gameBoard));
  for (let i = 0; i < 10; i++) {
    let currentPlayer = i % 2 === 0 ? player1 : player2;
    console.log(`${currentPlayer.name} turn choose a number`);
    let playerChoice = prompt(`${currentPlayer.name} turn choose a number`);
    updateBoard(playerChoice, currentPlayer.mark);
    if (checkWin(gameBoard)) {
      console.log(`${currentPlayer.name} wins`);
      break;
    } else if (checkTie(gameBoard)) {
      console.log("tie game");
      break;
    }
    console.log(displayBoard(gameBoard));
  }
}
// console.log(displayBoard(gameBoard));
gameControl(playerX, playerO);
