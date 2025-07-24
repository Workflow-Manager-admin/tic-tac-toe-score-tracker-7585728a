import React from "react";
import "./Panel.css";

/**
 * PUBLIC_INTERFACE
 * Shows a list of played games with outcomes, for current user.
 * @param {Array} props.history - Array of { opponent, result, date }
 */
function HistoryPanel({ history }) {
  return (
    <div className="panel-container">
      <h2 className="panel-title">History</h2>
      {history.length === 0 ? (
        <div className="panel-empty">No games played yet.</div>
      ) : (
        <table className="panel-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Opponent</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {history.map((game, idx) => (
              <tr key={idx}>
                <td>{new Date(game.date).toLocaleString()}</td>
                <td>{game.opponent}</td>
                <td>
                  <span className={
                    game.result === "Win" ? "result-win"
                    : game.result === "Lose" ? "result-lose"
                    : "result-draw"
                  }>
                    {game.result}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default HistoryPanel;
