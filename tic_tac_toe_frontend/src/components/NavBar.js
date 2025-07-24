import React from "react";
import "./NavBar.css";

/**
 * PUBLIC_INTERFACE
 * Navigation bar for switching between game, history and leaderboard views.
 * @param {Object} props
 * @param {string} props.currentPage
 * @param {function} props.onSelectPage
 */
function NavBar({ currentPage, onSelectPage }) {
  return (
    <nav className="nav-bar">
      <button
        className={`nav-btn${currentPage === "game" ? " active" : ""}`}
        onClick={() => onSelectPage("game")}
      >
        Game
      </button>
      <button
        className={`nav-btn${currentPage === "history" ? " active" : ""}`}
        onClick={() => onSelectPage("history")}
      >
        History
      </button>
      <button
        className={`nav-btn${currentPage === "leaderboard" ? " active" : ""}`}
        onClick={() => onSelectPage("leaderboard")}
      >
        Leaderboard
      </button>
    </nav>
  );
}

export default NavBar;
