import React, { useState } from "react";

const MatchCard = ({ match }) => {
  const [showPlayers, setShowPlayers] = useState(false);

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "live":
        return "status-live";
      case "completed":
        return "status-completed";
      case "upcoming":
        return "status-upcoming";
      default:
        return "status-live";
    }
  };

  const togglePlayers = () => {
    setShowPlayers(!showPlayers);
  };

  // --- Helpers for LIVE matches ---
  const getLiveBattingTeam = () => {
    return match.battingTeam === 1 ? match.team1 : match.team2;
  };

  const getLiveBowlingTeam = () => {
    return match.battingTeam === 1 ? match.team2 : match.team1;
  };

  const getCurrentBatsmen = () => {
    const team = getLiveBattingTeam();
    if (!team || !team.players) return [];
    return team.players.filter((p) => p.status === "batting");
  };

  const getOutPlayers = () => {
    const team = getLiveBattingTeam();
    if (!team || !team.players) return [];
    return team.players.filter((p) => p.status === "out");
  };

  const getYetToBat = () => {
    const team = getLiveBattingTeam();
    if (!team || !team.players) return [];
    return team.players.filter((p) => p.status === "yet-to-bat");
  };

  const getCurrentBowler = () => {
    const team = getLiveBowlingTeam();
    if (!team || !team.players) return null;
    return team.players.find((p) => p.status === "bowling");
  };

  // --- Reusable Formatters for ALL Scorecards ---
  const formatBattingStats = (player) => {
    if (!player) return "";
    // Show stats if the player has batted (runs > 0 or balls > 0)
    if (player.runs > 0 || player.balls > 0) {
      return `${player.runs}(${player.balls})`;
    }
    // Handle players who are out for a duck
    if (player.status === "out" && player.runs === 0 && player.balls === 0) {
      return "0(0)";
    }
    return "DNB"; // Did Not Bat
  };

  const formatBowlingStats = (player) => {
    if (!player) return "";

    if (parseFloat(player.oversBowled) > 0) {
      const runsConceded = player.runs || 0;
      return `${player.wickets}/${runsConceded} (${player.oversBowled})`;
    }
    return "";
  };

  return (
    <div className="match-card">
      <div className={`match-status ${getStatusClass(match.status)}`}>
        {match.status.toUpperCase()}
      </div>

      <div className="teams-section">
        <div className="team">
          <div className="team-name">{match.team1.shortName}</div>
          <div className="team-score">
            {match.score1}/{match.wickets1}
          </div>
          <div className="team-overs">({match.overs1} overs)</div>
        </div>
        <div className="vs-divider">VS</div>
        <div className="team">
          <div className="team-name">{match.team2.shortName}</div>
          <div className="team-score">
            {match.score2}/{match.wickets2}
          </div>
          <div className="team-overs">({match.overs2} overs)</div>
        </div>
      </div>

      {/* Live Match Mini-Details */}
      {match.status.toLowerCase() === "live" && (
        <div className="live-details">
          <div className="current-info">
            <div className="batting-info">
              <span className="info-label">Batting:</span>
              <span className="info-value">
                {getCurrentBatsmen()
                  .map(
                    (batsman) =>
                      `${batsman.name} ${batsman.runs}(${batsman.balls})`
                  )
                  .join(", ")}
              </span>
            </div>
            {getCurrentBowler() && (
              <div className="bowling-info">
                <span className="info-label">Bowling:</span>
                <span className="info-value">
                  {getCurrentBowler().name}{" "}
                  {formatBowlingStats(getCurrentBowler())}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="match-info">
        <div className="venue">{match.venue}</div>
        <button className="players-toggle" onClick={togglePlayers}>
          {showPlayers ? "Hide Details" : "Show Details"}
        </button>
      </div>

      {showPlayers && (
        <div className="players-list">
          {/* ========== LIVE MATCH VIEW ========== */}
          {match.status.toLowerCase() === "live" && (
            <div className="match-status-details">
              <div className="batting-details">
                <h4 className="section-title">
                  {getLiveBattingTeam().name} - Batting
                </h4>
                <div className="player-category">
                  <h5 className="category-title">Current Batsmen</h5>
                  {getCurrentBatsmen().map((player, index) => (
                    <div
                      key={`live-bat-${index}`}
                      className="player-item current"
                    >
                      <span className="player-name">{player.name}</span>
                      <span className="player-stats batting">
                        {formatBattingStats(player)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="player-category">
                  <h5 className="category-title">Out</h5>
                  {getOutPlayers().map((player, index) => (
                    <div key={`live-out-${index}`} className="player-item out">
                      <span className="player-name">{player.name}</span>
                      <span className="player-stats batting">
                        {formatBattingStats(player)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="player-category">
                  <h5 className="category-title">Yet to Bat</h5>
                  {getYetToBat()
                    .slice(0, 5)
                    .map((player, index) => (
                      <div
                        key={`live-ytb-${index}`}
                        className="player-item yet-to-bat"
                      >
                        <span className="player-name">{player.name}</span>
                      </div>
                    ))}
                </div>
              </div>
              <div className="bowling-details">
                <h4 className="section-title">
                  {getLiveBowlingTeam().name} - Bowling
                </h4>
                <div className="player-category">
                  <h5 className="category-title">Current Bowler</h5>
                  {getCurrentBowler() && (
                    <div className="player-item current">
                      <span className="player-name">
                        {getCurrentBowler().name}
                      </span>
                      <span className="player-stats bowling">
                        {formatBowlingStats(getCurrentBowler())}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ========== COMPLETED MATCH VIEW ========== */}
          {match.status.toLowerCase() === "completed" && (
            <div className="scorecard-details">
              <div className="innings-card">
                <h4 className="section-title">
                  {match.team1.name} Innings{" "}
                  <span>
                    {match.score1}/{match.wickets1} ({match.overs1} overs)
                  </span>
                </h4>
                <div className="scorecard-grid">
                  <div className="batting-scorecard">
                    <h5>Batting</h5>
                    {match.team1.players
                      .filter((p) => formatBattingStats(p) !== "DNB")
                      .map((player, index) => (
                        <div key={`t1-bat-${index}`} className="player-item">
                          <span className="player-name">{player.name}</span>
                          <span className="player-stats batting">
                            {formatBattingStats(player)}
                          </span>
                        </div>
                      ))}
                  </div>
                  <div className="bowling-scorecard">
                    <h5>Bowling</h5>
                    {match.team2.players
                      .filter((p) => formatBowlingStats(p) !== "")
                      .map((player, index) => (
                        <div key={`t2-bowl-${index}`} className="player-item">
                          <span className="player-name">{player.name}</span>
                          <span className="player-stats bowling">
                            {formatBowlingStats(player)}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div className="innings-card">
                <h4 className="section-title">
                  {match.team2.name} Innings{" "}
                  <span>
                    {match.score2}/{match.wickets2} ({match.overs2} overs)
                  </span>
                </h4>
                <div className="scorecard-grid">
                  <div className="batting-scorecard">
                    <h5>Batting</h5>
                    {match.team2.players
                      .filter((p) => formatBattingStats(p) !== "DNB")
                      .map((player, index) => (
                        <div key={`t2-bat-${index}`} className="player-item">
                          <span className="player-name">{player.name}</span>
                          <span className="player-stats batting">
                            {formatBattingStats(player)}
                          </span>
                        </div>
                      ))}
                  </div>
                  <div className="bowling-scorecard">
                    <h5>Bowling</h5>
                    {match.team1.players
                      .filter((p) => formatBowlingStats(p) !== "")
                      .map((player, index) => (
                        <div key={`t1-bowl-${index}`} className="player-item">
                          <span className="player-name">{player.name}</span>
                          <span className="player-stats bowling">
                            {formatBowlingStats(player)}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========== UPCOMING MATCH VIEW ========== */}
          {match.status.toLowerCase() === "upcoming" && (
            <div className="players-grid">
              <div className="team-players">
                <h4 className="section-title">{match.team1.name}</h4>
                {match.team1.players.map((player, index) => (
                  <div key={index} className="player-item">
                    <span className="player-name">{player.name}</span>
                    <span className="player-role">{player.role}</span>
                  </div>
                ))}
              </div>
              <div className="team-players">
                <h4 className="section-title">{match.team2.name}</h4>
                {match.team2.players.map((player, index) => (
                  <div key={index} className="player-item">
                    <span className="player-name">{player.name}</span>
                    <span className="player-role">{player.role}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MatchCard;
