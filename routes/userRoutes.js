const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");

// ✅ clear routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// 🔐 protected route
router.get("/profile", protect, getUserProfile);

module.exports = router;