import React, { useState, useEffect } from "react";
import MatchCard from "./MatchCard";
import axios from "axios";

const Dashboard = () => {
  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetchMatches();
  }, []);

  useEffect(() => {
    filterMatches();
  }, [matches, filter]);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/matches`); // Added /api
      setMatches(response.data);
      setError(null);
    } catch (err) {
      setError(
        "Failed to fetch matches. Make sure the backend server is running."
      );
      console.error("Error fetching matches:", err);
    } finally {
      setLoading(false);
    }
  };

  const filterMatches = () => {
    if (filter === "all") {
      setFilteredMatches(matches);
    } else {
      setFilteredMatches(
        matches.filter(
          (match) => match.status.toLowerCase() === filter.toLowerCase()
        )
      );
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  if (loading) {
    return <div className="loading">Loading matches...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2 className="dashboard-title">Match Updates</h2>
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === "all" ? "active" : ""}`}
            onClick={() => handleFilterChange("all")}
          >
            All Matches
          </button>
          <button
            className={`filter-btn ${filter === "live" ? "active" : ""}`}
            onClick={() => handleFilterChange("live")}
          >
            Live
          </button>
          <button
            className={`filter-btn ${filter === "completed" ? "active" : ""}`}
            onClick={() => handleFilterChange("completed")}
          >
            Completed
          </button>
        </div>
      </div>

      {filteredMatches.length === 0 ? (
        <div className="no-matches">
          No matches found for the selected filter.
        </div>
      ) : (
        <div className="matches-grid">
          {filteredMatches.map((match) => (
            <MatchCard key={match._id} match={match} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
