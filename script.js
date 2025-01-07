const startButton = document.getElementById("start-button");
const introSection = document.getElementById("intro");
const firstPlayerForm = document.getElementById("first-player");
const firstNext = document.getElementById("firstNext");
const secondPlayerForm = document.getElementById("second-player");
const secondNext = document.getElementById("secondNext");
const startSection = document.getElementById("start");
const firstInput = document.getElementById("fPlayer");
const secondInput = document.getElementById("sPlayer");
const showFirstName = document.getElementById("showFirstName");
const showSecondName = document.getElementById("showSecondName");
const startGame = document.getElementById("start-game");
const nameMonitor = document.getElementById("nameMonitor");
const switchName = document.getElementById("switchName");
const boardElements = document.querySelectorAll(".board");
const restart = document.getElementById("restart");

let gameController; 
let player1, player2; 
let draw = false;


startButton.addEventListener("click", () => {
  introSection.classList.remove("active");
  firstPlayerForm.classList.add("active");
});

firstNext.addEventListener("click", (e) => {
  e.preventDefault();

  if (!firstInput.value.trim()) {
    let existingError = document.querySelector(".error-message");

    if (!existingError) {
      const errorMessage = document.createElement("p");
      errorMessage.textContent = "Name field is required!";
      errorMessage.classList.add("error-message");
      errorMessage.style.marginTop = "40px";
      errorMessage.style.color = "red";
      firstPlayerForm.appendChild(errorMessage);
    }
    return;
  }

  const existingError = document.querySelector(".error-message");
  if (existingError) {
    existingError.remove();
  }

  firstPlayerForm.classList.remove("active");
  secondPlayerForm.classList.add("active");
});

secondNext.addEventListener("click", (e) => {
  e.preventDefault();

  player1 = Player("player1", "X", firstInput.value.trim());
  player2 = Player("player2", "O", secondInput.value.trim());

  if (!secondInput.value.trim()) {
    let existingError = document.querySelector(".error-message");

    if (!existingError) {
      const errorMessage = document.createElement("p");
      errorMessage.textContent = "Name field is required!";
      errorMessage.classList.add("error-message");
      errorMessage.style.marginTop = "40px";
      errorMessage.style.color = "red";
      secondPlayerForm.appendChild(errorMessage);
    }
    return;
  }

  const existingError = document.querySelector(".error-message");
  if (existingError) {
    existingError.remove();
  }

  secondPlayerForm.classList.remove("active");
  showFirstName.textContent = `1-) ${player1.realName} (${player1.icon})`;
  showSecondName.textContent = `2-) ${player2.realName} (${player2.icon})`;

  startSection.classList.add("active");
});


function GameBoard() {
  const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const cells = (number, playerIcon) => {
    if (number >= 1 && number <= 3) {
      board[0][number - 1] = playerIcon;
    } else if (number >= 4 && number <= 6) {
      board[1][number - 4] = playerIcon;
    } else if (number >= 7 && number <= 9) {
      board[2][number - 7] = playerIcon;
    }
  };

  return { board, cells };
}


const Player = (playerName, icon, realName) => {
  return { playerName, icon, realName };
};

function GameController(player1, player2) {
  let currentPlayer = player1;

  const switchGame = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const getCurrentPlayer = () => currentPlayer;

  return { switchGame, getCurrentPlayer };
}

let gameBoard = GameBoard();

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
    return true;
  }

  if (!gameBoard.board.flat().includes("")) {
    draw = true;
    return true;
  }

  return false;
};

startGame.addEventListener("click", () => {

  player1 = Player("player1", "X", firstInput.value.trim());
  player2 = Player("player2", "O", secondInput.value.trim());

  
  gameController = GameController(player1, player2);

  let getPlayer = gameController.getCurrentPlayer();

  startSection.classList.remove("active");
  nameMonitor.classList.add("active");
  
  switchName.textContent = `${getPlayer.realName}'s Turn!`;

  activateGame()

});


function activateGame() {

  boardElements.forEach((cell, index) => {
    cell.classList.add("hover-enabled");
    cell.addEventListener("click", () => {

      if (cell.textContent.trim() !== "") {
        if (!nameMonitor.querySelector(".error-message")) {
          let gameError = document.createElement("p");
          gameError.textContent = "The cell is not empty - Choose another one!";
          gameError.classList.add("error-message");
          gameError.style.marginTop = "40px";
          gameError.style.color = "red";
          nameMonitor.appendChild(gameError);
      
          setTimeout(() => gameError.remove(), 2000);
        }
        return;
      }
  

      let currentPlayer = gameController.getCurrentPlayer();
      cell.textContent = currentPlayer.icon;
      gameBoard.cells(index + 1, currentPlayer.icon);

      if (finishGame()) {
        if(draw) {
          switchName.textContent = "The game is a draw!";
         } else {
          switchName.textContent = `${currentPlayer.realName} wins! 🎉`;
         }

        restart.style.display = "block";
        stopGame();
        return;
      }
  
      gameController.switchGame();
      let nextPlayer = gameController.getCurrentPlayer();
      switchName.textContent = `${nextPlayer.realName}'s Turn!`;
  
    });
  });
  
} 

function stopGame() {
  boardElements.forEach((cell, index) => {
    cell.style.pointerEvents = "none";
    cell.classList.remove("hover-enabled");
  });
}

restart.addEventListener("click", () => {
  
  gameBoard = GameBoard();


  boardElements.forEach((cell) => {
    cell.innerHTML = ""; 
    cell.style.pointerEvents = "auto";
    cell.classList.add("hover-enabled");  
  });


  gameController = GameController(player1, player2);
  switchName.textContent = `${gameController.getCurrentPlayer().realName}'s Turn!`;
  restart.style.display = "none"; 
});

