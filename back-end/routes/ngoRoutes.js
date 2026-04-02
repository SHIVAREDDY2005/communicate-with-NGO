const express = require("express");
const router = express.Router();
const {
  registerNGO,
  loginNGO,
  updateNgoProfile,
} = require("../controllers/ngoController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerNGO);
router.post("/login", loginNGO);
router.put("/profile", protect, updateNgoProfile);

module.exports = router;
