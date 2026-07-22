// server/index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const PORT = process.env.PORT || 5000;

// --- MySQL Connection Pool ---
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Promisify for async/await usage
const promisePool = pool.promise();

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Helper to test DB connection on startup ---
(async function testDB() {
  try {
    const [rows] = await promisePool.query("SELECT 1");
    console.log("✅ MySQL Database connected successfully!");
  } catch (err) {
    console.error("❌ MySQL Connection failed:", err.message);
  }
})();

// --- API ROUTES (Now pulling from Database!) ---

// 1. Get all products (with JSON parsing)
app.get("/api/products", async (req, res) => {
  try {
    const [rows] = await promisePool.query(
      "SELECT * FROM products ORDER BY RAND()",
    );
    // Parse JSON fields before sending
    const parsedRows = rows.map((row) => ({
      ...row,
      images: JSON.parse(row.images),
      sizes: JSON.parse(row.sizes),
      colors: JSON.parse(row.colors),
    }));
    res.json(parsedRows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching products" });
  }
});

// 2. Get a single product by ID (with JSON parsing)
app.get("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await promisePool.query(
      "SELECT * FROM products WHERE id = ?",
      [id],
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    const row = rows[0];
    const parsedRow = {
      ...row,
      images: JSON.parse(row.images),
      sizes: JSON.parse(row.sizes),
      colors: JSON.parse(row.colors),
    };
    res.json(parsedRow);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching product" });
  }
});

// 3. Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Fashion Hub API is live with MySQL!" });
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`🚀 Luxury server running on http://localhost:${PORT}`);
});
