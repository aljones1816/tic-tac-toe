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
            value: "X",
            clicked:false
        },
        {
            id: "seven",
            value: "O",
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

const gameController = (() => {

    //TODO implement a function that calls the updateGameboard method of the GameBoard 
    // when a player clicks on a square

    //TODO implement a function to check the victory condition of the board

    //TODO implement a function to track the currently active player.

})();

const createPlayer = (playerName,value) => {
    const name = playerName;
    const markerValue = value;
    return {name, markerValue}
}



gameBoard.renderboard(gameBoard.getGameBoard());
