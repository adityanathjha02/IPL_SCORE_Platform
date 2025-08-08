const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/ipl-dashboard",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.log("MongoDB connection error:", err);
});

// Routes
const matchRoutes = require("./routes/matches");
app.use("/api/matches", matchRoutes);

app.get("/", (req, res) => {
  res.json({ message: "IPL Dashboard API is running!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
