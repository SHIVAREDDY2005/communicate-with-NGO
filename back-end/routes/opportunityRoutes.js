const express = require("express");
const router = express.Router();

const {
  createOpportunity,
  getOpportunities,
  getMyOpportunities,
  updateOpportunity,
  deleteOpportunity
} = require("../controllers/opportunityController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createOpportunity);
router.get("/", getOpportunities);
router.get("/my", protect, getMyOpportunities);
router.put("/:id", protect, updateOpportunity);
router.delete("/:id", protect, deleteOpportunity);

module.exports = router;