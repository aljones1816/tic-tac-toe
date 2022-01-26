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


    //Calls the changeGameboard method of the GameBoard 
    // when a player clicks on a square
    const boardSquares = document.querySelectorAll('.board-square')
    
    boardSquares.forEach(square => {
        square.addEventListener('click', (e) => {
            players.forEach(player => {
                if (player.isActive) {
                    gameBoard.changeGameboard(square.id,player)
                }
            })
            checkWin(gameBoard.gameboard);
            controlActivePlayer();
            
        })
    });

    //Check the victory condition of the board
    const checkWin = (gameboard) => {

        const winningPlays = [
            ["one","two","three"],
            ["four","five","six"],
            ["seven","eight","nine"],
            ["one","four","seven"],
            ["two","five","six"],
            ["three","six","nine"],
            ["one","five","nine"],
            ["seven","five","three"]
        ];

        const activePlayer = players.filter(player => {
            return player.isActive
          })

        const activePlayerSquares = gameboard.filter(square => {
            return square.value == activePlayer[0].value;
        })  

        const activePlayerSquareIds = activePlayerSquares.map(square => square.id);

        winningPlays.forEach(play => {
            if (play.every(elem => activePlayerSquareIds.indexOf(elem) > -1)) {
                console.log(activePlayer[0].name + "wins!")
            }
        })


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


