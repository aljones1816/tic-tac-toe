const gameBoard = (() => {
    const gameboard = [
        {
            id: "one",
            value: "",
            clicked:false
        },
        { 
            id: "two",
            value: "",
            clicked:false
        },
        {
            id: "three",
            value: "",
            clicked:false
        },
        {
            id: "four",
            value: "",
            clicked:false
        },
        {
            id: "five",
            value: "",
            clicked:false
        },
        {
            id: "six",
            value: "",
            clicked:false
        },
        {
            id: "seven",
            value: "",
            clicked:false
        },
        {
            id: "eight",
            value: "",
            clicked:false
        },
        {
            id: "nine",
            value: "",
            clicked:false
        },
    ];

    const renderboard =  () => {
        gameboard.map(x => {
            const square = document.getElementById(x.id);
            const newText = document.createTextNode(x.value);
            square.replaceChildren(newText);
        })
    }

    const changeGameboard = (squareID, player) => {
            let idToChange = gameboard.findIndex(square => square.id == squareID);
            if (gameboard[idToChange].clicked == false) {
                gameboard[idToChange].value = player.value;
                gameboard[idToChange].clicked = true;
            }
            renderboard();
    }
    
    return {gameboard, renderboard, changeGameboard}
})();

const createPlayer = (playerName,markerValue,active) => {
    const name = playerName;
    const value = markerValue;
    const isActive = active;
    return {name, value, isActive}
}

const gameController = (() => {
    const players = [
        createPlayer("playerOne","X",true),
        createPlayer("playerTwo","O",false)
    ]

    // allow players to set custom names
    const setPlayerOneName = document.getElementById('playerOneName');

    setPlayerOneName.addEventListener('click', function (event) {
        event.preventDefault();
        players[0].name = document.getElementById('playerOne').value;
    }) 
    
    const setPlayerTwoName = document.getElementById('playerTwoName');

    setPlayerTwoName.addEventListener('click', function (event) {
        event.preventDefault();
        players[1].name = document.getElementById('playerTwo').value;
    })  


    //Calls the changeGameboard method of the GameBoard 
    // when a player clicks on a square
    const boardSquares = document.querySelectorAll('.board-square')
    
    // each time a square is pllayed check to see if the game has been won or tied
    boardSquares.forEach(square => {
        square.addEventListener('click', (e) => {
            players.forEach(player => {
                if (player.isActive) {
                    gameBoard.changeGameboard(square.id,player)
                }
            })

            let currentState = checkWin(gameBoard.gameboard)
            updateGameState(currentState.gameStatus, currentState.activePlayer);
            controlActivePlayer();
            
        })
    });

    //Check the victory condition of the board to see if there is a win or a tie
    const checkWin = (gameboard) => {
        let gameStatus = 0;

        const winningPlays = [
            ["one","two","three"],
            ["four","five","six"],
            ["seven","eight","nine"],
            ["one","four","seven"],
            ["two","five","eight"],
            ["three","six","nine"],
            ["one","five","nine"],
            ["seven","five","three"]
        ];

        const activePlayer = players.filter(player => {
            return player.isActive
          })[0]
          
         
        const activePlayerSquares = gameboard.filter(square => {
            return square.value == activePlayer.value;
        })  

        const activePlayerSquareIds = activePlayerSquares.map(square => square.id);
    
        if (activePlayerSquareIds.length > 4) {
            gameStatus = 2;
        }
        
        winningPlays.forEach(play => {
            if (play.every(elem => activePlayerSquareIds.indexOf(elem) > -1)) {
                gameStatus = 1;
            } 
        })

        return { gameStatus, activePlayer }
    }

    // if a player has won or the game is tied update the gamestate with that condition
    const updateGameState = (gameStatus, activePlayer) => {
        const modal = document.getElementById('modal-one');
        var para = document.createElement("p");
        
        if (gameStatus === 1 ) {
            var node = document.createTextNode(activePlayer.name + " wins!!!");
            modal.classList.add('open');
            para.appendChild(node);
            modal.appendChild(para);
        } else if (gameStatus === 2) {
            var node = document.createTextNode("It's a tie!!!");
            modal.classList.add('open');
            para.appendChild(node);
            modal.appendChild(para);
        } else return

        
    }

    //Track the currently active player.
    const controlActivePlayer = () => {
        players.forEach(player => {
            player.isActive = !player.isActive;
        })
    }

})();

const initializeGame = () => {
    gameBoard.renderboard();
    
}
// initialize game with a blank game board
initializeGame();


