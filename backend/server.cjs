const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 1000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve React build folder
app.use(express.static(path.join(__dirname, "build")));

// Fake "database"
let users = [];

// Register endpoint
app.post("/register", (req, res) => {
  const { name, age } = req.body;
  if (!name || !age) return res.status(400).json({ message: "Please fill in all fields" });

  const exists = users.find(u => u.name === name);
  if (exists) return res.status(400).json({ message: "User already registered" });

  users.push({ name, age });
  res.json({ message: "Registered successfully" });
});

// Login endpoint
app.post("/login", (req, res) => {
  const { name, age } = req.body;
  const user = users.find(u => u.name === name && u.age == age);
  if (user) res.json({ message: "Login successful" });
  else res.status(400).json({ message: "Invalid name or age" });
});

// React fallback route using regex
app.get(/^\/.*$/, (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
