const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:8000";

/**
 * PUBLIC_INTERFACE
 * Start new game for user, optionally vs. specified opponent.
 * @param {string} username
 * @param {string} [opponent]
 */
export async function startGame(username, opponent = null) {
  // TODO: Replace with real endpoint when available
  const resp = await fetch(`${API_BASE}/game/start`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, opponent }),
  });
  return resp.json();
}

/**
 * PUBLIC_INTERFACE
 * Submit a move in an ongoing game.
 * @param {string} gameId
 * @param {number} row
 * @param {number} col
 */
export async function makeMove(gameId, row, col) {
  const resp = await fetch(`${API_BASE}/game/move`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ game_id: gameId, row, col }),
  });
  return resp.json();
}

/**
 * PUBLIC_INTERFACE
 * Get current board/game state for active game.
 * @param {string} gameId
 */
export async function getGame(gameId) {
  const resp = await fetch(`${API_BASE}/game/${gameId}`);
  return resp.json();
}

/**
 * PUBLIC_INTERFACE
 * Fetch history for the specified user.
 * @param {string} username
 */
export async function getHistory(username) {
  const resp = await fetch(`${API_BASE}/history/${username}`);
  return resp.json();
}

/**
 * PUBLIC_INTERFACE
 * Fetch leaderboard/top players.
 */
export async function getLeaderboard() {
  const resp = await fetch(`${API_BASE}/leaderboard`);
  return resp.json();
}
