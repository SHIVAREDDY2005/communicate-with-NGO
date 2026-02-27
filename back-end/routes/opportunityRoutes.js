const express = require("express");
const router = express.Router();

const controller = require("../controllers/opportunityController");
const { protect } = require("../middleware/authMiddleware"); // ✅ FIXED

router.post("/", protect, controller.createOpportunity);
router.get("/",controller.getAllOpportunities);
router.get("/my", protect, controller.getMyOpportunities);
router.put("/:id", protect, controller.updateOpportunity);
router.delete("/:id", protect, controller.deleteOpportunity);
router.get("/dashboard/stats", protect, controller.getDashboardStats);
router.get("/", controller.getAllOpportunities);
module.exports = router;