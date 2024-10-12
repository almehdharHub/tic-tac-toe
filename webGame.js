const gameBoard = (function () {
  let board = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  const getBoard = () => board;

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
    getBoard,
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

const playerX = Player("player 1", "X");
const playerO = Player("player 2", "O");

const gameController = (function () {
  const player1 = playerX;
  const player2 = playerO;
  let currentPlayer = player1;
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
  }

  function playTurn(position) {
    let winner = document.getElementById("game-status");
    if (gameBoard.updateBoard(position, currentPlayer.mark)) {
      if (gameBoard.checkWin(currentPlayer.mark)) {
        winner.innerHTML = ` ${currentPlayer.name} wins`;
        console.log(`${currentPlayer.name} wins`);
        return true; // game over
      } else if (gameBoard.checkTie()) {
        winner.innerHTML = `Tie game`;
        console.log("Tie game");
        return true; // game over
      } else {
        switchPlayer(); // switch player
      }
    } else {
      console.log("Invalid move. Try again.");
    }
  }
  return { startGame, playTurn };
})();

const domDisplay = (function () {
  const boardElements = document.querySelectorAll(".cell");
  function displayBoard(board) {
    for (let i = 0; i < boardElements.length; i++) {
      boardElements[i].innerHTML = board[i];
    }
  }
  boardElements.forEach((cell, index) => {
    cell.addEventListener("click", () => {
      let playerChoice = index + 1;
      gameController.playTurn(playerChoice);
      displayBoard(gameBoard.getBoard());
    });
  });
  const resetGame = document.getElementById("restart-button");
  resetGame.addEventListener("click", () => {
    gameBoard.resetBoard();
    displayBoard(gameBoard.getBoard());
    console.log(gameBoard.displayBoard());
  });

  return { displayBoard };
})();
console.log(gameBoard.getBoard());
domDisplay.displayBoard(gameBoard.getBoard());
// gameController.startGame();
