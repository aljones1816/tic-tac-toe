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

    const renderboard =  () => {
        gameboard.map(x => {
            const square = document.getElementById(x.id);
            const newText = document.createTextNode(x.value);
            square.replaceChildren(newText);
        })
    }

    const changeGameboard = (squareID, player) => {
            let idToChange = gameboard.findIndex(square => square.id == squareID);
            gameboard[idToChange].value = player.value;
            renderboard();
    }
    
    return {renderboard, changeGameboard}
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


// initialize game with a blank game board
gameBoard.renderboard();
gameBoard.changeGameboard("one", {name: "bob", value: "O"})
