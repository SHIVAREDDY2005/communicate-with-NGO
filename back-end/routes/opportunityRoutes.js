const express = require("express");
const router = express.Router();
const { createOpportunity, getOpportunities } = require("../controllers/opportunityController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createOpportunity);
router.get("/", getOpportunities);

module.exports = router;
