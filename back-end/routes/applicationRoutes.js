const express = require("express");
const router = express.Router();

const controller = require("../controllers/applicationController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, controller.apply);
router.get("/my", protect, controller.myApplications);
router.get("/opportunity/:opportunityId", protect, controller.getApplicants);
router.put("/:id", protect, controller.updateStatus);
router.delete("/undo/:opportunityId", protect, controller.undoApplication);
    
module.exports = router;