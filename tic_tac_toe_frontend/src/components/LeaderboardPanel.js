import React from "react";
import "./Panel.css";

/**
 * PUBLIC_INTERFACE
 * Leaderboard showing top players and scores.
 * @param {Array} props.leaderboard - Array of { player, wins, losses }
 */
function LeaderboardPanel({ leaderboard }) {
  return (
    <div className="panel-container">
      <h2 className="panel-title">Leaderboard</h2>
      {leaderboard.length === 0 ? (
        <div className="panel-empty">No scores yet.</div>
      ) : (
        <table className="panel-table">
          <thead>
            <tr>
              <th>Player</th>
              <th>Wins</th>
              <th>Losses</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((item, idx) => (
              <tr key={idx}>
                <td>{item.player}</td>
                <td>{item.wins}</td>
                <td>{item.losses}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default LeaderboardPanel;
