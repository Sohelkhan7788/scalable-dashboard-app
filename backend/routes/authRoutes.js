const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashed,
  });

  await user.save();
  res.json("User Registered");
});

// Login
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.json("User Not Found");

  const valid = await bcrypt.compare(req.body.password, user.password);
  if (!valid) return res.json("Wrong Password");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.json(token);
});

module.exports = router;

const auth = require("../middleware/authMiddleware");

// GET USER PROFILE
router.get("/profile", auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user);
});
