// server/index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow your React app to talk to this backend
app.use(express.json()); // Allow your server to read JSON bodies

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working! Your Fashion Hub API is live." });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
