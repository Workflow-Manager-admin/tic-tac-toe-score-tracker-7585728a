import React, { useState, useEffect } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import GameBoard from "./components/GameBoard";
import HistoryPanel from "./components/HistoryPanel";
import LeaderboardPanel from "./components/LeaderboardPanel";
import * as api from "./api";

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState("light");
  const [currentPage, setCurrentPage] = useState("game"); // "game" | "history" | "leaderboard"
  const [username, setUsername] = useState("");
  const [pendingUsername, setPendingUsername] = useState("");
  // -- Game state --
  const [gameId, setGameId] = useState(null);
  const [board, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [isXNext, setIsXNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  // -- Panels data --
  const [history, setHistory] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(false);

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Effect: fetch history and leaderboard on user/login
  useEffect(() => {
    if (username) {
      fetchPanels();
    }
    // eslint-disable-next-line
  }, [username]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // PUBLIC_INTERFACE
  const fetchPanels = async () => {
    setLoading(true);
    try {
      const [hist, lb] = await Promise.all([
        api.getHistory(username),
        api.getLeaderboard(),
      ]);
      setHistory(hist || []);
      setLeaderboard(lb || []);
    } catch (e) {
      setHistory([]);
      setLeaderboard([]);
    } finally {
      setLoading(false);
    }
  };

  // Game start handler
  const handleStartGame = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    try {
      const data = await api.startGame(pendingUsername.trim());
      if (data && data.game_id) {
        setUsername(pendingUsername.trim());
        setGameId(data.game_id);
        setBoard(data.board || [["", "", ""], ["", "", ""], ["", "", ""]]);
        setIsXNext(data.is_x_next ?? true);
        setGameOver(data.game_over ?? false);
        setWinner(data.winner ?? null);
        setCurrentPage("game");
      } else {
        alert("Could not start game.");
      }
    } catch (e) {
      alert("Error starting game.");
    } finally {
      setLoading(false);
    }
  };

  // PUBLIC_INTERFACE
  const handleMove = async (i, j) => {
    if (!gameId) return;
    setLoading(true);
    try {
      const data = await api.makeMove(gameId, i, j);
      setBoard(data.board || board);
      setIsXNext(data.is_x_next ?? isXNext);
      setGameOver(data.game_over ?? false);
      setWinner(data.winner ?? null);
      // Refresh post-game
      if (data.game_over && username) fetchPanels();
    } catch (e) {
      alert("Invalid move.");
    } finally {
      setLoading(false);
    }
  };

  // Main panel switcher
  let panelContent;
  if (!username) {
    panelContent = (
      <form
        onSubmit={handleStartGame}
        style={{
          maxWidth: 340,
          margin: "4rem auto 0",
          background: "var(--bg-secondary,#f8f9fa)",
          borderRadius: 17,
          padding: "2.5rem 1.5rem 2rem",
          boxShadow: "0 4px 22px rgba(32,59,123,0.07)",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            color: "var(--primary,#1976d2)",
            fontSize: "1.95rem",
            marginBottom: 14,
            fontWeight: 700,
          }}
        >
          Welcome to Tic Tac Toe
        </h2>
        <input
          type="text"
          required
          autoFocus
          placeholder="Enter your username"
          value={pendingUsername}
          onChange={(e) => setPendingUsername(e.target.value)}
          style={{
            padding: "0.65rem 1rem",
            fontSize: "1.1rem",
            borderRadius: 7,
            border: "1.5px solid var(--border-color,#e9ecef)",
            outline: "none",
            marginBottom: 16,
            width: "100%",
            boxSizing: "border-box",
          }}
          disabled={loading}
        />
        <br />
        <button
          type="submit"
          disabled={loading || !pendingUsername.trim()}
          style={{
            padding: "0.7rem 1.5rem",
            fontWeight: 600,
            fontSize: "1.1rem",
            border: "none",
            background: "var(--primary,#1976d2)",
            borderRadius: 8,
            color: "#fff",
            cursor: "pointer",
            marginTop: 7,
            letterSpacing: 0.1,
          }}
        >
          {loading ? "Starting..." : "Start Game"}
        </button>
      </form>
    );
  } else if (currentPage === "game") {
    panelContent = (
      <div style={{ margin: "0 auto", maxWidth: 360 }}>
        <GameBoard
          board={board}
          isXNext={isXNext}
          onMove={handleMove}
          gameOver={gameOver}
          winner={winner}
        />
        {(gameOver || !gameId) && (
          <button
            style={{
              marginTop: "1.7rem",
              background: "var(--primary,#1976d2)",
              color: "#fff",
              padding: "0.68rem 2.2rem",
              fontSize: "1.08rem",
              border: "none",
              borderRadius: 9,
              fontWeight: 700,
              cursor: "pointer",
            }}
            onClick={async () => {
              setLoading(true);
              try {
                const data = await api.startGame(username);
                setGameId(data.game_id);
                setBoard(data.board);
                setIsXNext(data.is_x_next ?? true);
                setGameOver(data.game_over ?? false);
                setWinner(data.winner ?? null);
              } catch {
                alert("Could not start new game.");
              } finally {
                setLoading(false);
              }
            }}
            disabled={loading}
          >
            {loading ? "Starting..." : "New Game"}
          </button>
        )}
      </div>
    );
  } else if (currentPage === "history") {
    panelContent = (
      <HistoryPanel history={history} />
    );
  } else if (currentPage === "leaderboard") {
    panelContent = (
      <LeaderboardPanel leaderboard={leaderboard} />
    );
  }

  return (
    <div className="App">
      <header className="App-header" style={{ minHeight: "auto", paddingBottom: 0 }}>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          style={{ zIndex: 100 }}
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
        <NavBar currentPage={currentPage} onSelectPage={setCurrentPage} />
        {panelContent}
        {username && (
          <div style={{ marginTop: 40, opacity: 0.5, fontSize: 13 }}>
            Signed in as <b>{username}</b> &middot;&nbsp;
            <button
              style={{
                border: "none",
                background: "none",
                color: "var(--primary,#1976d2)",
                fontWeight: 600,
                cursor: "pointer",
                textDecoration: "underline",
                fontSize: "inherit",
              }}
              onClick={() => {
                setUsername("");
                setPendingUsername("");
                setGameId(null);
                setBoard([
                  ["", "", ""],
                  ["", "", ""],
                  ["", "", ""],
                ]);
                setGameOver(false);
                setWinner(null);
              }}
              tabIndex={0}
            >
              Sign Out
            </button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
