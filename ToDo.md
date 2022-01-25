1. ~~Set up project~~
2. ~~Store gameboard inside of a gameboard object~~
3. ~~Create player object~~
4. ~~Game controller object~~

DONE:
The gameBoard component should hold the gameboard and a render method that renders the game screen with the contents of the gameboard array. The gameBoard component should also have a method to update the gameboard array with a square id, a player ID (1 or 2), and a value for that player (X or O) passed in.

TODO:
The gameController component should have a function to track who the current active player is, and a function that calls the gameBoard's update gameboard method when the active player clicks. It should also have a function that tracks whether a player has won the game (using an array of win patterns).

The player objects should merely have a name, a player ID (1 or 2) and a a marker value (X or O)

So when a square on the board is clicked, an event listener should get the square's ID, mark it with the active player's symbol, and check the victory conditions. If the player wins, the game ends. Otherwise the active player should switch to the next player, and play continues.