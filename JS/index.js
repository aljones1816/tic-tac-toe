const gameBoard = (() => {
    const gameboard = ["X","O","X","O","X","O","X","O","X"];
    const renderboard =  () => {
        const gridSquares = ["one","two","three","four","five","six","seven","eight","nine"];
        gridSquares.map(x => {
            const square = document.getElementById(x);
            const newText = document.createTextNode(gameboard[gridSquares.indexOf(x)]);
            square.appendChild(newText);
        })
    }
    return {renderboard}
})();

const gameFlow = (() => {

    return {}
})();

const player = () => {

    return {}
}

gameBoard.renderboard();