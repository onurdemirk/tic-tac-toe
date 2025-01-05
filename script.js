const GameBoard = () => {
  const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const cells = (number, playerIcon) => {
    if (number <= 3) {
      if (board[0][number - 1] !== "") {
        console.log("The cell is not empty - Choose another one!");
        return;
      } else {
        board[0][number - 1] = playerIcon;
      }
    } else if (number > 3 && number <= 6) {
      if (board[1][number - 4] !== "") {
        console.log("The cell is not empty - Choose another one!");
        return;
      } else {
        board[1][number - 4] = playerIcon;
      }
    } else if (number > 6 && number <= 9) {
      if (board[2][number - 7] !== "") {
        console.log("The cell is not empty - Choose another one!");
        return;
      } else {
        board[2][number - 7] = playerIcon;
      }
    }
  };
  return { board, cells };
};

const Player = (name, icon) => {
  return { name, icon };
};

const player1 = Player("player1", "X");
const player2 = Player("player2", "O");
const gameBoard = GameBoard();
const gameController = GameController(player1, player2);

function GameController(player1, player2) {
  let currentPlayer = player1;

  const switchGame = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const getCurrentPlayer = () => currentPlayer;

  return { switchGame, getCurrentPlayer };
}

const finishGame = () => {
  if (
    (gameBoard.board[0][0] === "X" &&
      gameBoard.board[1][0] === "X" &&
      gameBoard.board[2][0] === "X") || // Sütun 1
    (gameBoard.board[0][1] === "X" &&
      gameBoard.board[1][1] === "X" &&
      gameBoard.board[2][1] === "X") || // Sütun 2
    (gameBoard.board[0][2] === "X" &&
      gameBoard.board[1][2] === "X" &&
      gameBoard.board[2][2] === "X") || // Sütun 3
    (gameBoard.board[0][0] === "X" &&
      gameBoard.board[0][1] === "X" &&
      gameBoard.board[0][2] === "X") || // Satır 1
    (gameBoard.board[1][0] === "X" &&
      gameBoard.board[1][1] === "X" &&
      gameBoard.board[1][2] === "X") || // Satır 2
    (gameBoard.board[2][0] === "X" &&
      gameBoard.board[2][1] === "X" &&
      gameBoard.board[2][2] === "X") || // Satır 3
    (gameBoard.board[0][0] === "X" &&
      gameBoard.board[1][1] === "X" &&
      gameBoard.board[2][2] === "X") || // Çapraz 1
    (gameBoard.board[0][2] === "X" &&
      gameBoard.board[1][1] === "X" &&
      gameBoard.board[2][0] === "X") // Çapraz 2
  ) {
    console.log("Player 1 Wins!");
    return true;
  }

  if (
    (gameBoard.board[0][0] === "O" &&
      gameBoard.board[1][0] === "O" &&
      gameBoard.board[2][0] === "O") || // Sütun 1
    (gameBoard.board[0][1] === "O" &&
      gameBoard.board[1][1] === "O" &&
      gameBoard.board[2][1] === "O") || // Sütun 2
    (gameBoard.board[0][2] === "O" &&
      gameBoard.board[1][2] === "O" &&
      gameBoard.board[2][2] === "O") || // Sütun 3
    (gameBoard.board[0][0] === "O" &&
      gameBoard.board[0][1] === "O" &&
      gameBoard.board[0][2] === "O") || // Satır 1
    (gameBoard.board[1][0] === "O" &&
      gameBoard.board[1][1] === "O" &&
      gameBoard.board[1][2] === "O") || // Satır 2
    (gameBoard.board[2][0] === "O" &&
      gameBoard.board[2][1] === "O" &&
      gameBoard.board[2][2] === "O") || // Satır 3
    (gameBoard.board[0][0] === "O" &&
      gameBoard.board[1][1] === "O" &&
      gameBoard.board[2][2] === "O") || // Çapraz 1
    (gameBoard.board[0][2] === "O" &&
      gameBoard.board[1][1] === "O" &&
      gameBoard.board[2][0] === "O") // Çapraz 2
  ) {
    console.log("Player 2 Wins!");
    return true;
  }

  if (!gameBoard.board.flat().includes("")) {
    console.log("Draw! No more moves left.");
    return true;
  }

  return false;
};

const playGame = () => {
  while (!finishGame()) {
    let input = parseInt(prompt("Please add your cell number!"));
    if (input > 9 || input < 1) {
      console.log("Please add a valid number");
      continue;
    }
    let getPlayer = gameController.getCurrentPlayer();
    gameBoard.cells(input, getPlayer.icon);
    gameController.switchGame();
    console.table(gameBoard.board);
  }
  console.log("Game Over");
};

const startButton = document.getElementById("startButton");

startButton.addEventListener("click", playGame);
