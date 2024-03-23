import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const INITIAL_GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

const PLAYERS = {
    X: "Player 1",
    O: "Player 2"
};

function deriveActivePlayer(gameTurns) {
    let currentPlayer = "X";
    if (gameTurns.length > 0 && gameTurns[0].player === "X") {
        currentPlayer = "O";
    }
    return currentPlayer;
}

function deriveGameBoard(gameTurns){
    // let gameBoard = INITIAL_GAME_BOARD;
    let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

    for (const turn of gameTurns) {
        const { square, player } = turn;
        const { row, col } = square;

        gameBoard[row][col] = player;
    }

    return gameBoard;
}

function deriveWinner(gameBoard, players){
    let winner;

    for(const combination of WINNING_COMBINATIONS){
        const firstSquareSymbol = gameBoard[combination[0].row][combination[0].col];
        const secondSquareSymbol = gameBoard[combination[1].row][combination[1].col];
        const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].col];

        if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
            winner = players[firstSquareSymbol];
        }
    }

    return winner;
}

function App() {
    // In GameBoard and Player components, we need to know that which player is currently active so as to perform operations as per need, but to maintain the common state in both components is useless. In this case, we have to lift the state up, i.e, maintain that particular common state in their immediate parent component, which is App in this case.

    // So this activePlayer is maintained in this app component and passed as a prop to gameboard and player components.

    const [gameTurns, setGameTurns] = useState([]);
    // const [activePlayer, setActivePlayer] = useState("X");
    // const [hasWinner, setHasWinner] = useState(false);

    const [players, setPlayers] = useState(PLAYERS);

    // We have to use as less no. of states as possible. We are changing the active Player by using the gameTurns state, and not by activePlayer state. That is, we deriving from the state, and not creating another state for this.

    const activePlayer = deriveActivePlayer(gameTurns);
    const gameBoard = deriveGameBoard(gameTurns);
    const winner = deriveWinner(gameBoard, players);
    const hasDraw = gameTurns.length === 9 && !winner;

    function handleSelectSquare(rowIndex, colIndex) {
        // setActivePlayer((currActivePlayer) =>
        //     currActivePlayer === "X" ? "O" : "X"
        // );

        setGameTurns((prevTurns) => {
            // let currentPlayer = "X";
            // if (prevTurns.length > 0 && prevTurns[0].player === "X") {
            //     currentPlayer = "O";
            // }

            const currentPlayer = deriveActivePlayer(prevTurns);

            const updatedTurns = [
                {
                    square: { row: rowIndex, col: colIndex },
                    player: currentPlayer,
                },
                ...prevTurns,
            ];
            return updatedTurns;
        });
    }

    function handleRestart(){
        setGameTurns([]);
    }

    function handlePlayerNameChange(symbol, newName){
        setPlayers(prevPlayers => {
            return {
                ...prevPlayers,
                [symbol]: newName
            };
        });
    }

    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    {/* These two components are the same one, but if the state changes in one, the other won't get affected. React creates isolated instance for every component, so that changes in one don't affect the same other component. */}

                    <Player
                        initialName={PLAYERS.X}
                        symbol="X"
                        isActive={activePlayer === "X"}
                        onChangeName={handlePlayerNameChange}
                    />
                    <Player
                        initialName={PLAYERS.O}
                        symbol="O"
                        isActive={activePlayer === "O"}
                        onChangeName={handlePlayerNameChange}
                    />
                </ol>
                {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
                <GameBoard
                    onSelectSquare={handleSelectSquare}
                    // activePlayerSymbol={activePlayer}
                    // turns={gameTurns}
                    board={gameBoard}
                />
            </div>
            <Log turns={gameTurns} />
        </main>
    );
}

export default App;
