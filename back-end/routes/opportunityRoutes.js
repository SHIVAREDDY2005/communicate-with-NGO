const express = require("express");

const controller = require("../controllers/opportunityController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, controller.createOpportunity);
router.get("/", controller.getAllOpportunities);
router.get("/my", protect, controller.getMyOpportunities);
router.get("/dashboard/stats", protect, controller.getDashboardStats);
router.put("/:id", protect, controller.updateOpportunity);
router.delete("/:id", protect, controller.deleteOpportunity);

module.exports = router;
