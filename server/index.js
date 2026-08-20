// server/index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;

// ============================
// 1. CORS CONFIGURATION (MUST BE FIRST)
// ============================
const allowedOrigins = ["http://localhost:5173", "https://tgdev.com"];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        return callback(null, true);
      } else {
        console.warn("CORS blocked origin:", origin);
        return callback(new Error("Not allowed by CORS"), false);
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Origin", "Accept"],
  }),
);

// Handle preflight requests (OPTIONS)
//app.options("*", cors());

// ============================
// 2. MULTER FILE UPLOAD SETUP
// ============================
// Ensure upload directories exist
const uploadDir = path.join(__dirname, "uploads");
const imagesDir = path.join(uploadDir, "images");
const videosDir = path.join(uploadDir, "videos");

if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });
if (!fs.existsSync(videosDir)) fs.mkdirSync(videosDir, { recursive: true });

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isVideo = file.mimetype.startsWith("video/");
    cb(null, isVideo ? videosDir : imagesDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedImageTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
  ];
  const allowedVideoTypes = [
    "video/mp4",
    "video/webm",
    "video/ogg",
    "video/quicktime",
  ];

  if (
    allowedImageTypes.includes(file.mimetype) ||
    allowedVideoTypes.includes(file.mimetype)
  ) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only images and videos are allowed."),
      false,
    );
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
});

// ============================
// 3. SERVE STATIC FILES (BEFORE ROUTES)
// ============================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ============================
// 4. UPLOAD ROUTE (BEFORE express.json())
// ============================
app.post("/api/admin/upload", upload.single("file"), (req, res) => {
  console.log("Upload request received");

  if (!req.file) {
    console.log("No file received");
    return res.status(400).json({ message: "No file uploaded" });
  }

  const fileType = req.file.mimetype.startsWith("video/") ? "videos" : "images";
  const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${fileType}/${req.file.filename}`;

  console.log("File uploaded successfully:", fileUrl);

  res.json({
    message: "File uploaded successfully",
    url: fileUrl,
    filename: req.file.filename,
    type: req.file.mimetype.startsWith("video/") ? "video" : "image",
  });
});

// ============================
// 5. JSON MIDDLEWARE (AFTER UPLOAD ROUTE)
// ============================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================
// 6. MYSQL DATABASE CONNECTION
// ============================
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const promisePool = pool.promise();

(async function testDB() {
  try {
    const [rows] = await promisePool.query("SELECT 1");
    console.log("✅ MySQL Database connected successfully!");
  } catch (err) {
    console.error("❌ MySQL Connection failed:", err.message);
  }
})();

// ============================
// 7. API ROUTES
// ============================

// --- Get all products (with JSON parsing) ---
app.get("/api/products", async (req, res) => {
  try {
    const [rows] = await promisePool.query(
      "SELECT * FROM products ORDER BY id",
    );
    const parsedRows = rows.map((row) => ({
      ...row,
      images: JSON.parse(row.images || "[]"),
      sizes: JSON.parse(row.sizes || "[]"),
      colors: JSON.parse(row.colors || "[]"),
    }));
    res.json(parsedRows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching products" });
  }
});

// --- Get a single product by ID ---
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
      images: JSON.parse(row.images || "[]"),
      sizes: JSON.parse(row.sizes || "[]"),
      colors: JSON.parse(row.colors || "[]"),
    };
    res.json(parsedRow);
  } catch (err) {
    console.error("❌ Error fetching product:", err);
    res.status(500).json({ message: "Server error fetching product" });
  }
});

// --- Update product stock ---
app.patch("/api/products/:id/stock", async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    const [rows] = await promisePool.query(
      "SELECT stock FROM products WHERE id = ?",
      [id],
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    const currentStock = rows[0].stock;
    const newStock = currentStock - quantity;

    if (newStock < 0) {
      return res.status(400).json({ message: "Not enough stock available" });
    }

    await promisePool.query("UPDATE products SET stock = ? WHERE id = ?", [
      newStock,
      id,
    ]);

    res.json({
      message: "Stock updated successfully",
      newStock: newStock,
    });
  } catch (err) {
    console.error("Error updating stock:", err);
    res.status(500).json({ message: "Server error updating stock" });
  }
});

// --- Test route ---
app.get("/api/test", (req, res) => {
  res.json({ message: "Fashion Hub API is live with MySQL!" });
});

// ============================
// 8. ADMIN ROUTES
// ============================

// --- Get all products (admin) ---
app.get("/api/admin/products", async (req, res) => {
  try {
    const [rows] = await promisePool.query(
      "SELECT * FROM products ORDER BY id",
    );
    const parsedRows = rows.map((row) => ({
      ...row,
      images: JSON.parse(row.images || "[]"),
      sizes: JSON.parse(row.sizes || "[]"),
      colors: JSON.parse(row.colors || "[]"),
    }));
    res.json(parsedRows);
  } catch (err) {
    console.error("Error fetching admin products:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// --- Add a new product ---
app.post("/api/admin/products", async (req, res) => {
  const {
    name,
    category,
    gender,
    price,
    description,
    images,
    sizes,
    colors,
    stock,
    isNew,
  } = req.body;
  try {
    const [result] = await promisePool.query(
      `INSERT INTO products (name, category, gender, price, description, images, sizes, colors, stock, is_new)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        category,
        gender,
        price,
        description,
        JSON.stringify(images || []),
        JSON.stringify(sizes || []),
        JSON.stringify(colors || []),
        stock,
        isNew || false,
      ],
    );
    res
      .status(201)
      .json({ id: result.insertId, message: "Product created successfully" });
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// --- Update a product ---
app.put("/api/admin/products/:id", async (req, res) => {
  const { id } = req.params;
  const {
    name,
    category,
    gender,
    price,
    description,
    images,
    sizes,
    colors,
    stock,
    isNew,
  } = req.body;
  try {
    await promisePool.query(
      `UPDATE products SET
        name = ?, category = ?, gender = ?, price = ?, description = ?,
        images = ?, sizes = ?, colors = ?, stock = ?, is_new = ?
       WHERE id = ?`,
      [
        name,
        category,
        gender,
        price,
        description,
        JSON.stringify(images || []),
        JSON.stringify(sizes || []),
        JSON.stringify(colors || []),
        stock,
        isNew || false,
        id,
      ],
    );
    res.json({ message: "Product updated successfully" });
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// --- Delete a product ---
app.delete("/api/admin/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await promisePool.query("DELETE FROM products WHERE id = ?", [id]);
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// --- Get all orders ---
app.get("/api/admin/orders", async (req, res) => {
  try {
    const [rows] = await promisePool.query(
      "SELECT * FROM orders ORDER BY created_at DESC",
    );
    res.json(rows);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// --- Update order status ---
app.patch("/api/admin/orders/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    await promisePool.query("UPDATE orders SET status = ? WHERE id = ?", [
      status,
      id,
    ]);
    res.json({ message: "Order status updated successfully" });
  } catch (err) {
    console.error("Error updating order:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// --- Save order from checkout ---
app.post("/api/orders", async (req, res) => {
  const {
    orderNumber,
    customerName,
    email,
    address,
    city,
    state,
    zip,
    country,
    paymentMethod,
    items,
    subtotal,
    shipping,
    tax,
    total,
  } = req.body;

  try {
    const [result] = await promisePool.query(
      `INSERT INTO orders
        (order_number, customer_name, customer_email, shipping_address, city, state, zip, country,
         payment_method, items, subtotal, shipping, tax, total, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        orderNumber,
        customerName,
        email,
        address,
        city,
        state,
        zip,
        country,
        paymentMethod,
        JSON.stringify(items),
        subtotal,
        shipping,
        tax,
        total,
        "pending",
      ],
    );
    res
      .status(201)
      .json({ id: result.insertId, message: "Order saved successfully" });
  } catch (err) {
    console.error("Error saving order:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ============================
// 9. START SERVER
// ============================
app.listen(PORT, () => {
  console.log(`🚀 Luxury server running on http://localhost:${PORT}`);
});
