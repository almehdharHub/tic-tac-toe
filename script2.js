const gameBoard = (function () {
  let board = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  const updateBoard = (position, mark) => {
    if (board[position - 1] !== "X" && board[position - 1] !== "O") {
      board[position - 1] = mark;
      return true;
    }

    return false;
  };

  function checkWin(mark) {
    const winningCombinations = [
      [0, 1, 2], // top row
      [3, 4, 5], // middle row
      [6, 7, 8], // bottom row
      [0, 3, 6], // left column
      [1, 4, 7], // middle column
      [2, 5, 8], // right column
      [0, 4, 8], // top left to bottom right
      [2, 4, 6], // bottom left to top right
    ];
    return winningCombinations.some((combination) => {
      return combination.every((index) => board[index] === mark);
    });
  }

  function checkTie() {
    return board.every((cell) => cell === "X" || cell === "O");
  }

  function displayBoard() {
    return `
      | ${board[0]} | ${board[1]} | ${board[2]} 
      ----------
      | ${board[3]} | ${board[4]} | ${board[5]} 
      ----------
      | ${board[6]} | ${board[7]} | ${board[8]}
      `;
  }
  const resetBoard = () => {
    board = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  };
  return {
    updateBoard,
    resetBoard,
    checkWin,
    checkTie,
    displayBoard,
  };
})();

const Player = (name, mark) => {
  return { name, mark };
};

const playerX = Player("playerX", "X");
const playerO = Player("playerO", "O");

const GameController = (function () {
  let currentPlayer;
  const player1 = playerX;
  const player2 = playerO;
  function startGame() {
    gameBoard.resetBoard();
    currentPlayer = player1;
    console.log(gameBoard.displayBoard());
    playTurn(); // start game
  }

  function switchPlayer() {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    console.log(gameBoard.displayBoard());
    console.log(`${currentPlayer.name} turn choose a number`);
    playTurn();
  }

  function playTurn() {
    let playerChoice = prompt(
      `${currentPlayer.name} turn choose a number (1-9):`
    );
    if (gameBoard.updateBoard(playerChoice, currentPlayer.mark)) {
      if (gameBoard.checkWin(currentPlayer.mark)) {
        console.log(`${currentPlayer.name} wins`);
        return true; // game over
      } else if (gameBoard.checkTie()) {
        console.log("Tie game");
        return true; // game over
      } else {
        switchPlayer(); // switch player
      }
    } else {
      console.log("Invalid move. Try again.");
    }
  }
  return { startGame };
})();

GameController.startGame();
