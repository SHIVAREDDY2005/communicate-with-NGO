const express = require("express");
const router = express.Router();

const { registerNGO, loginNGO } = require("../controllers/ngoController");
const { protect } = require("../middleware/authMiddleware");
const User = require("../models/User");

router.post("/register", registerNGO);
router.post("/login", loginNGO);

/* PROFILE UPDATE */
router.put("/profile", protect, async (req, res) => {
  if (req.user.role !== "ngo")
    return res.status(403).json({ message: "Access denied" });

  const updated = await User.findByIdAndUpdate(
    req.user._id,
    req.body,
    { new: true }
  );

  res.json(updated);
});

module.exports = router;