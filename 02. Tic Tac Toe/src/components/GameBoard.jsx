// import { useState } from "react";

// const initialGameBoard = [
//     [null, null, null],
//     [null, null, null],
//     [null, null, null],
// ];

function GameBoard({ onSelectSquare, board }) {
    // let gameBoard = initialGameBoard;

    // for (const turn of turns) {
    //     const { square, player } = turn;
    //     const { row, col } = square;

    //     gameBoard[row][col] = player;
    // }

    // const [gameBoard, setGameBoard] = useState(initialGameBoard);

    // function handleSelectSquare(rowIndex, colIndex){
    //     setGameBoard((prevGameBoard) => {
    //         const updatedBoard = [...prevGameBoard.map((row) => [...row])];
    //         updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updatedBoard;

    //         We know, that arrays and objects are reference data types, so that changing anything can change the previous value, so we can lost the access to previous state. Therefore, for every change in the gameboard, create a updatedBoard, that will fetch the previous state values, and then change in that updated board.

    //         prevGameBoard[rowIndex][colIndex] = 'X'  -> Don't do like this.
    //     });

    //     onSelectSquare();
    // }

    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) => (
                            <li key={colIndex}>
                                {/* <button onClick={() => handleSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button> */}
                                <button
                                    onClick={() =>
                                        onSelectSquare(rowIndex, colIndex)
                                    }
                                    disabled={playerSymbol !== null}
                                >
                                    {playerSymbol}
                                </button>

                                {/* The disabled attribute on the button will ensure that, if any symbol is clicked once, then it will not be clicked twice. */}
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
}

export default GameBoard;
