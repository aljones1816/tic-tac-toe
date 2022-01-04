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

    const renderboard =  (board) => {
        board.map(x => {
            const square = document.getElementById(x.id);
            const newText = document.createTextNode(x.value);
            square.replaceChildren(newText);
        })
    }

    const getGameBoard = () => {
        return gameboard;
    }

    const changeGameboard = (squareID, newValue) => {
        gameBoard[gameBoard.indexOf(id => id == squareID)]
    }
    
    return {renderboard, getGameBoard, changeGameboard}
})();

const displayController = (() => {
    let currentBoard = gameBoard.getGameBoard();

    const markBoard = () => {
        
    }
})();

const createPlayer = (playerName,value,playerStatus) => {
    const name = playerName;
    const markerValue = value;
    const status = playerStatus;

    return {name, markerValue, status, markSquare}
}


const gameFlow = (() => {
    
     
    return {}
})();

gameBoard.changeGameboard("one","O");
gameBoard.renderboard(gameBoard.getGameBoard());
