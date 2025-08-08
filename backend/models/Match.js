const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  name: String,
  role: String,
  runs: { type: Number, default: 0 },
  balls: { type: Number, default: 0 },
  wickets: { type: Number, default: 0 },
  oversBowled: { type: String, default: "0.0" },
  status: {
    type: String,
    enum: ["batting", "bowling", "out", "yet-to-bat"],
    default: "yet-to-bat",
  },
});

const teamSchema = new mongoose.Schema({
  name: String,
  shortName: String,
  players: [playerSchema],
});

const matchSchema = new mongoose.Schema({
  team1: teamSchema,
  team2: teamSchema,
  score1: { type: Number, default: 0 },
  score2: { type: Number, default: 0 },
  overs1: { type: String, default: "0.0" },
  overs2: { type: String, default: "0.0" },
  wickets1: { type: Number, default: 0 },
  wickets2: { type: Number, default: 0 },
  currentBowler: String, // ADDED BACK
  currentBatsmen: [String], // ADDED BACK
  status: {
    type: String,
    enum: ["Live", "Completed", "Upcoming"],
    default: "Live",
  },
  venue: String,
  date: { type: Date, default: Date.now },
  battingTeam: { type: Number, default: 1 },
});

module.exports = mongoose.model("Match", matchSchema);
