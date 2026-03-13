const express = require("express");
const router = express.Router();

const { registerVolunteer, loginVolunteer } = require("../controllers/volunteerController");
const { protect } = require("../middleware/authMiddleware");
const User = require("../models/User");

router.post("/register", registerVolunteer);
router.post("/login", loginVolunteer);

/* PROFILE UPDATE */
router.put("/profile", protect, async (req, res) => {
  if (req.user.role !== "volunteer")
    return res.status(403).json({ message: "Access denied" });

  const updated = await User.findByIdAndUpdate(
    req.user._id,
    req.body,
    { new: true }
  );

  res.json(updated);
});

module.exports = router;