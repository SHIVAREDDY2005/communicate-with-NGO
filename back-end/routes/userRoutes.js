const express = require("express");

const { protect } = require("../middleware/authMiddleware");
const {
  getMe,
  getNgoOrganization,
  updateProfile,
  getNgoMembers,
  addNgoMember,
} = require("../controllers/userController");

const router = express.Router();

router.get("/me", protect, getMe);
router.get("/ngo/organization", protect, getNgoOrganization);
router.get("/ngo/members", protect, getNgoMembers);
router.post("/ngo/add-member", protect, addNgoMember);
router.put("/profile", protect, updateProfile);

module.exports = router;
