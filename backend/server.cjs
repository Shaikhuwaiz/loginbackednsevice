// server.cjs
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 1000;

// middleware
app.use(cors());
app.use(express.json());

// fake "database"
let users = [];

// register endpoint
app.post("/register", (req, res) => {
  const { name, age } = req.body;

  if (!name || !age) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  // check if user exists
  const exists = users.find((u) => u.name === name);
  if (exists) {
    return res.status(400).json({ message: "User already registered" });
  }

  // add new user
  users.push({ name, age });
  return res.json({ message: "Registered successfully" });
});

// login endpoint
app.post("/login", (req, res) => {
  const { name, age } = req.body;

  const user = users.find((u) => u.name === name && u.age == age);
  if (user) {
    return res.json({ message: "Login successful" });
  } else {
    return res.status(400).json({ message: "Invalid name or age" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
