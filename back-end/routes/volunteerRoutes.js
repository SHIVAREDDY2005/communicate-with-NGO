const express = require("express");
const router = express.Router();
const {
  registerVolunteer,
  loginVolunteer,
  updateVolunteerProfile,
} = require("../controllers/volunteerController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerVolunteer);
router.post("/login", loginVolunteer);
router.put("/profile", protect, updateVolunteerProfile);

module.exports = router;
