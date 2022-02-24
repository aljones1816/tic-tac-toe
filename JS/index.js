const gameBoard = (() => {
  const gameboard = [
    {
      id: "one",
      value: "",
      clicked: false,
    },
    {
      id: "two",
      value: "",
      clicked: false,
    },
    {
      id: "three",
      value: "",
      clicked: false,
    },
    {
      id: "four",
      value: "",
      clicked: false,
    },
    {
      id: "five",
      value: "",
      clicked: false,
    },
    {
      id: "six",
      value: "",
      clicked: false,
    },
    {
      id: "seven",
      value: "",
      clicked: false,
    },
    {
      id: "eight",
      value: "",
      clicked: false,
    },
    {
      id: "nine",
      value: "",
      clicked: false,
    },
  ];

  const renderboard = () => {
    gameboard.map((x) => {
      const square = document.getElementById(x.id);
      const newText = document.createTextNode(x.value);
      square.replaceChildren(newText);
    });
  };

  const changeGameboard = (squareID, player) => {
    let idToChange = gameboard.findIndex((square) => square.id == squareID);
    if (gameboard[idToChange].clicked == false) {
      gameboard[idToChange].value = player.value;
      gameboard[idToChange].clicked = true;
    }
    renderboard();
  };

  return { gameboard, renderboard, changeGameboard };
})();

const createPlayer = (playerName, playerValue, ID, status) => {
  const name = playerName;
  const value = playerValue;
  const isActive = status;
  const wins = 0;
  const playerID = ID;
  return { name, value, isActive, wins, playerID };
};

const gameController = (() => {
  let gameOver = 0;
  let draws = 0;

  const players = [
    createPlayer("Player 1", "X", "playerOneBoard", true),
    createPlayer("Player 2", "O", "playerTwoBoard", false),
  ];

  // render player scores
  const renderScores = () => {
    const p1scoreboard = document.getElementById("p1score");
    const p2scoreboard = document.getElementById("p2score");
    const drawboard = document.getElementById("draws");

    p1scoreboard.innerHTML = "Wins: " + players[0].wins;
    p2scoreboard.innerHTML = "Wins: " + players[1].wins;
    drawboard.innerHTML = draws;
  };

  // allow players to set custom names

  const modalButton = document.getElementById("openModal");

  modalButton.addEventListener("click", function (event) {
    event.preventDefault();
    const modal = document.getElementById("modal-one");
    modal.classList.add("open");
    const modalBack = document.getElementById("modal-back");
    modalBack.classList.add("open-background");
  });

  function closeModal(event) {
    event.preventDefault();
    const modal = document.getElementById("modal-one");
    modal.classList.remove("open");
    const modalBack = document.getElementById("modal-back");
    modalBack.classList.remove("open-background");
  }

  const modalBack = document.getElementById("modal-back");
  modalBack.addEventListener("click", function (e) {
    const modal = document.getElementById("modal-one");
    if (modal.contains(e.target)) {
      return;
    }

    closeModal(e);
  });

  const setPlayerOneName = document.getElementById("playerOneName");

  setPlayerOneName.addEventListener("click", function (event) {
    event.preventDefault();
    if (document.getElementById("playerOne").value != "") {
      players[0].name = document.getElementById("playerOne").value;
      let div = document.getElementById("p1Name");
      div.innerHTML = "X - " + players[0].name;
      document.getElementById("playerOne").value = "";
    }

    if (document.getElementById("playerTwo").value != "") {
      players[1].name = document.getElementById("playerTwo").value;
      let div = document.getElementById("p2Name");
      div.innerHTML = "O - " + players[1].name;
      document.getElementById("playerTwo").value = "";
    }

    closeModal(event);
  });

  //Calls the changeGameboard method of the GameBoard
  // when a player clicks on a square
  const boardSquares = document.querySelectorAll(".board-square");

  // each time a square is played check to see if the game has been won or tied
  boardSquares.forEach((square) => {
    square.addEventListener("click", (e) => {
      const squareindex = gameBoard.gameboard.findIndex(
        (space) => space.id == square.id
      );

      const activesquarestatus = gameBoard.gameboard[squareindex].clicked;
      players.forEach((player) => {
        if (player.isActive) {
          gameBoard.changeGameboard(square.id, player);
        }
      });
      if (!activesquarestatus) {
        let currentState = checkWin(gameBoard.gameboard);
        updateGameState(currentState.gameStatus, currentState.activePlayer);
        controlActivePlayer();
      } else return;
    });
  });

  //Check the victory condition of the board to see if there is a win or a tie
  const checkWin = (gameboard) => {
    let gameStatus = 0;

    const winningPlays = [
      ["one", "two", "three"],
      ["four", "five", "six"],
      ["seven", "eight", "nine"],
      ["one", "four", "seven"],
      ["two", "five", "eight"],
      ["three", "six", "nine"],
      ["one", "five", "nine"],
      ["seven", "five", "three"],
    ];

    const activePlayer = players.filter((player) => {
      return player.isActive;
    })[0];

    const activePlayerSquares = gameboard.filter((square) => {
      return square.value == activePlayer.value;
    });

    const activePlayerSquareIds = activePlayerSquares.map(
      (square) => square.id
    );

    if (activePlayerSquareIds.length > 4) {
      gameStatus = 2;
    }

    winningPlays.forEach((play) => {
      if (play.every((elem) => activePlayerSquareIds.indexOf(elem) > -1)) {
        gameStatus = 1;
      }
    });

    return { gameStatus, activePlayer };
  };

  // if a player has won or the game is tied update the gamestate with that condition
  const updateGameState = (gameStatus, activePlayer) => {
    const announcement = document.getElementById("gameAnnouncement");

    if ((gameStatus === 1) & (gameOver === 0)) {
      announcement.innerHTML = activePlayer.name + " wins!!!";
      gameBoard.gameboard.forEach((square) => {
        square.clicked = true;
      });
      activePlayerIndex = players.findIndex((obj) => obj.isActive);
      players[activePlayerIndex].wins += 1;
      renderScores();
      gameOver = 1;
    } else if (gameStatus === 2) {
      announcement.innerHTML = "It's a tie!!!";

      gameBoard.gameboard.forEach((square) => {
        square.clicked = true;
      });
      draws += 1;
      renderScores();
    } else return;
  };

  //Track the currently active player.
  const controlActivePlayer = () => {
    //TODO make so that activePlayer doesn't change on game end

    changeActivePlayerHighlight();

    players.forEach((player) => {
      player.isActive = !player.isActive;
      // TODO update the active player graphic
      //changeActivePlayerHighlight();
    });
  };

  const changeActivePlayerHighlight = () => {
    if (gameOver === 0) {
      players.forEach((player) => {
        if (player.isActive) {
          playerElement = document.getElementById(player.playerID);
          playerElement.classList.remove("activePlayer");
          playerElement.classList.add("inactivePlayer");
        } else {
          playerElement = document.getElementById(player.playerID);
          playerElement.classList.remove("inactivePlayer");
          playerElement.classList.add("activePlayer");
        }
      });
    }
  };

  // allow players to start a new game without resetting the score
  const resetGame = () => {
    gameBoard.gameboard.forEach((square) => {
      square.clicked = false;
      square.value = "";
    });

    gameOver = 0;

    players[0].isActive = true;
    players[1].isActive = false;
    player1Element = document.getElementById("playerOneBoard");
    player1Element.classList.remove("inactivePlayer");
    player1Element.classList.add("activePlayer");

    player2Element = document.getElementById("playerTwoBoard");
    player2Element.classList.remove("activePlayer");
    player2Element.classList.add("inactivePlayer");

    const announcement = document.getElementById("gameAnnouncement");
    announcement.innerHTML = "";
    gameBoard.renderboard();
  };

  document.getElementById("newGame").addEventListener("click", (e) => {
    e.preventDefault();
    resetGame();
  });

  // allow players to start new game with cleared scores
  document.getElementById("resetScores").addEventListener("click", (e) => {
    e.preventDefault();
    players[0].wins = 0;
    players[1].wins = 0;
    draws = 0;
    renderScores();
    resetGame();
  });

  return { renderScores };
})();

const initializeGame = () => {
  gameBoard.renderboard();
  gameController.renderScores();
};
// initialize game with a blank game board
initializeGame();
