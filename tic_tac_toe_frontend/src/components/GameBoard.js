import React from "react";
import "./GameBoard.css";

/**
 * PUBLIC_INTERFACE
 * GameBoard renders the 3x3 tic tac toe grid and handles user moves.
 * @param {Object} props
 * @param {array} props.board - 3x3 array representing the game state
 * @param {boolean} props.isXNext - Whether X plays next
 * @param {function} props.onMove - Handler(row, col)
 * @param {boolean} props.gameOver - Is the game finished?
 * @param {string|null} props.winner - "X", "O", or null if no winner yet
 */
function GameBoard({ board, isXNext, onMove, gameOver, winner }) {
  return (
    <div className="game-board-container">
      <div className="game-status">
        {gameOver ? (
          winner ? (
            <span className="winner">Winner: {winner}</span>
          ) : (
            <span className="draw">Draw!</span>
          )
        ) : (
          <span>
            Turn: <b>{isXNext ? "X" : "O"}</b>
          </span>
        )}
      </div>
      <div className="game-board">
        {board.map((row, i) =>
          row.map((cell, j) => (
            <button
              key={`${i}-${j}`}
              className="cell-btn"
              disabled={!!cell || gameOver}
              onClick={() => onMove(i, j)}
              aria-label={`row ${i+1}, col ${j+1}, ${cell || "empty"}`}
            >
              {cell}
            </button>
          ))
        )}
      </div>
    </div>
  );
}

export default GameBoard;
